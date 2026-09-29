import { test, expect } from '@playwright/test';

// A transport double implementing documented gtag queue/config/set/event and
// disable semantics. No request reaches Google, Signmons, email or any provider.
const mockTag = `(() => {
  let fields = {};
  function process(args) {
    const [op, name, value] = Array.from(args);
    if (op === 'config') { fields = {...fields, ...value}; return; }
    if (op === 'set') { fields = {...fields, ...name}; return; }
    if (op !== 'event' || window['ga-disable-G-32W3PBPD8Y']) return;
    const payload = {name, fields: {...fields, ...value}};
    navigator.sendBeacon('https://www.google-analytics.com/g/collect', JSON.stringify(payload));
  }
  const queue = window.dataLayer || [];
  window.dataLayer.push = (...args) => { args.forEach(process); return 0; };
  queue.slice().forEach(process);
  window.__mockTagLoaded = true;
})();`;
const canary = 'SYNTHETIC_PRIVATE_CANARY_NOT_A_REAL_TOKEN_987654';

async function network(context) {
  const traffic = [];
  const logs = [];
  function captureLogs(page) {
    page.on('console', message => logs.push(message.text()));
    page.on('pageerror', error => logs.push(error.message));
  }
  context.pages().forEach(captureLogs);
  context.on('page', captureLogs);
  await context.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.hostname === 'www.googletagmanager.com') {
      traffic.push({ type: 'tag', url: req.url(), body: '', headers: req.headers() });
      return route.fulfill({ contentType: 'text/javascript', body: mockTag });
    }
    if (url.hostname === 'www.google-analytics.com') {
      traffic.push({ type: 'collect', url: req.url(), body: req.postData() ?? '', headers: req.headers() });
      return route.fulfill({ status: 204 });
    }
    if (url.hostname === '127.0.0.1') return route.continue();
    // Block every other external request, including any accidental live API.
    return route.abort();
  });
  return { traffic, logs, events: () => traffic.filter(x => x.type === 'collect').map(x => JSON.parse(x.body)) };
}
async function ready(page) {
  await page.waitForFunction(() => Boolean(window.eternityAnalytics));
}
async function loadTag(page, capture) {
  const before = capture.events().filter(x => x.name === 'phone_click').length;
  await ready(page);
  await page.evaluate(() => window.eternityAnalytics.track('phone_click', { link_location: location.pathname }));
  await page.waitForFunction(() => window.__mockTagLoaded);
  await expect.poll(() => capture.events().filter(x => x.name === 'phone_click').length).toBe(before + 1);
}
async function mockManagement(page, actions = []) {
  await page.route('**/api/signmons/appointments/manage', route => {
    const body = route.request().postDataJSON();
    actions.push(body);
    const result = body.action === 'availability'
      ? { slots: [{ token: 'synthetic_slot', label: 'Wednesday 9–11 AM', start: '2026-10-07T13:00:00Z', end: '2026-10-07T15:00:00Z' }] }
      : { state: body.action === 'cancel' ? 'cancelled' : 'confirmed', reference: 'SYNTHETIC', appointment: { label: body.action === 'reschedule' ? 'Wednesday 9–11 AM' : 'Tuesday 9–11 AM' } };
    return route.fulfill({ json: result });
  });
}

test('private hard loads never initialize marketing, including upload and unknown routes', async ({ context, page }) => {
  const capture = await network(context);
  await mockManagement(page);
  for (const path of ['/appointment/manage', '/second-opinion', '/private-download', '/authentication', '/api/admin/second-opinions/synthetic']) {
    await page.goto(`${path}?token=${canary}#${canary}`);
    await page.waitForTimeout(2700);
    expect(capture.traffic).toEqual([]);
  }
  expect(JSON.stringify(capture.logs)).not.toContain(canary);
});

test('native public-to-private navigation preserves token and private view/reschedule/cancel', async ({ context, page }) => {
  const capture = await network(context);
  const actions = [];
  await mockManagement(page, actions);
  await page.goto('/');
  await loadTag(page, capture);
  const before = capture.traffic.length;
  await page.evaluate(token => {
    const link = document.createElement('a'); link.href = `/appointment/manage#${token}`; link.textContent = 'Synthetic manage link'; document.body.appendChild(link);
  }, canary);
  await page.getByRole('link', { name: 'Synthetic manage link' }).click();
  await expect(page.getByRole('heading', { name: 'Tuesday 9–11 AM' })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Choose another time' }).click();
  await page.getByRole('button', { name: 'Wednesday 9–11 AM' }).click();
  await expect(page.getByRole('heading', { name: 'Wednesday 9–11 AM' })).toBeVisible();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Cancel appointment' }).click();
  await expect(page.getByRole('heading', { name: 'Your appointment has been cancelled.' })).toBeVisible();
  await page.waitForTimeout(2700);
  expect(capture.traffic.length).toBe(before);
  expect(actions.map(x => x.action)).toEqual(['view', 'view', 'availability', 'reschedule', 'cancel']);
  expect(actions.every(x => x.managementToken === canary)).toBeTruthy();
  expect(JSON.stringify(capture.traffic)).not.toContain(canary);
  await page.goBack();
  await loadTag(page, capture);
  const afterBack = capture.traffic.length;
  await page.goForward();
  await expect(page.getByRole('heading', { name: 'Tuesday 9–11 AM' })).toBeVisible();
  await page.waitForTimeout(2700);
  expect(capture.traffic.length).toBe(afterBack);
});

for (const method of ['pushState', 'replaceState']) {
  test(`${method} crossing into private route uses a new isolated document`, async ({ context, page }) => {
    const capture = await network(context);
    await mockManagement(page);
    await page.goto('/'); await loadTag(page, capture);
    const before = capture.traffic.length;
    await page.evaluate(({ method, canary }) => history[method]({}, '', `/appointment/manage#${canary}`), { method, canary });
    await expect(page.getByRole('heading', { name: 'Tuesday 9–11 AM' })).toBeVisible();
    await page.waitForTimeout(2700);
    expect(capture.traffic.length).toBe(before);
    expect(JSON.stringify(capture.traffic)).not.toContain(canary);
  });
}

test('denied storage does not break immediate native phone/text/email clicks', async ({ context, page }) => {
  const capture = await network(context);
  await context.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('Storage denied'); } });
  });
  await page.goto('/?utm_source=chatgpt&utm_medium=referral');
  await ready(page);
  // Keep OS applications out of a synthetic test; website capture listeners must
  // have run without cancelling or delaying the native default action.
  const results = await page.evaluate(() => ['tel:+12167033183', 'sms:+12167033183', 'mailto:ben@eternityhvacr.com'].map(href => {
    const a = document.createElement('a'); a.href = href; document.body.appendChild(a);
    let cancelledByWebsite;
    a.addEventListener('click', e => { cancelledByWebsite = e.defaultPrevented; e.preventDefault(); });
    a.click(); return cancelledByWebsite;
  }));
  expect(results).toEqual([false, false, false]);
  await expect.poll(() => capture.events().filter(x => ['phone_click', 'text_click', 'email_click'].includes(x.name)).length).toBe(3);
  expect(capture.events().filter(x => x.name === 'ai_referral_visit')).toHaveLength(1);
});

test('malformed referrers, lookalike hosts and tainted stored attribution are discarded', async ({ context, page }) => {
  const capture = await network(context);
  await context.addInitScript(canary => {
    Object.defineProperty(document, 'referrer', { get: () => 'https://chatgpt.com.evil.example/private?token=' + canary });
    sessionStorage.setItem('eternity_lead_attribution', JSON.stringify({ landingPage: '/', utmSource: canary, utmCampaign: canary, referrerHost: canary }));
  }, canary);
  await page.goto('/'); await loadTag(page, capture);
  expect(capture.events().some(x => x.name === 'ai_referral_visit')).toBeFalsy();
  expect(JSON.stringify(capture.traffic)).not.toContain(canary);
  expect(await page.evaluate(() => window.eternityAnalytics.getAttribution())).toEqual({ landingPage: '/' });
  await context.addInitScript(() => Object.defineProperty(document, 'referrer', { get: () => 'https://[' }));
  await page.reload(); await loadTag(page, capture);
  expect(capture.events().filter(x => x.name === 'phone_click')).toHaveLength(2);
});

test('public page views are single-owned; hash and same-route updates do not duplicate views', async ({ context, page }) => {
  const capture = await network(context);
  await page.goto('/?utm_source=google&utm_medium=organic#schedule'); await loadTag(page, capture);
  await page.evaluate(() => {
    history.pushState({}, '', '/services/boiler-service');
    history.replaceState({}, '', '/services/boiler-service#main-content');
  });
  await expect.poll(() => capture.events().filter(x => x.name === 'page_view').length).toBe(2);
  await page.goBack();
  await expect.poll(() => capture.events().filter(x => x.name === 'page_view').length).toBe(3);
  const fields = capture.events().filter(x => x.name === 'page_view').map(x => x.fields);
  expect(fields.map(x => x.page_location)).toEqual(['https://eternityhvacr.com/', 'https://eternityhvacr.com/services/boiler-service', 'https://eternityhvacr.com/']);
  expect(fields.every(x => x.send_page_view === false)).toBeTruthy();
  expect(capture.traffic.filter(x => x.type === 'tag')).toHaveLength(1);
});

test('arbitrary public URL data fails closed without breaking estimator/anchor URLs', async ({ context, page }) => {
  const capture = await network(context);
  for (const url of [`/?q=${canary}`, `/?utm_campaign=${canary}`, `/#${canary}`]) {
    await page.goto(url); await ready(page);
    await page.evaluate(() => window.eternityAnalytics.track('phone_click'));
    await page.waitForTimeout(2700);
    expect(capture.traffic).toEqual([]);
  }
  await page.goto('/?estimateScope=direct-furnace-swap#schedule'); await loadTag(page, capture);
  expect(capture.events().some(x => x.name === 'page_view')).toBeTruthy();
});

test('event fields cannot transmit free text, URLs, timestamps or unknown names', async ({ context, page }) => {
  const capture = await network(context);
  await page.goto('/'); await loadTag(page, capture);
  await page.evaluate(canary => {
    window.eternityAnalytics.track('assistant_appointment_confirmed', { assistant: 'signmons_calldesk', appointment_start: canary, message: canary, link_url: canary, source_page: '/appointment/manage', customer_type: canary });
    window.eternityAnalytics.track(canary, { token: canary });
  }, canary);
  await expect.poll(() => capture.events().filter(x => x.name === 'assistant_appointment_confirmed').length).toBe(1);
  expect(JSON.stringify(capture.traffic)).not.toContain(canary);
  expect(JSON.stringify(capture.traffic)).not.toContain('/appointment/manage');
});

test('existing analytics opt-out prevents tag and events', async ({ context, page }) => {
  const capture = await network(context);
  await context.addInitScript(() => { window['ga-disable-G-32W3PBPD8Y'] = true; });
  await page.goto('/'); await ready(page);
  await page.evaluate(() => window.eternityAnalytics.track('phone_click'));
  await page.waitForTimeout(2700);
  expect(capture.traffic).toEqual([]);
});

async function fillRequest(page) {
  await page.locator('label').filter({ hasText: 'Repair or diagnostic' }).click();
  await expect(page.getByRole('radio', { name: 'Repair or diagnostic' })).toBeChecked();
  await page.locator('label').filter({ hasText: 'My home' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Service category').selectOption('Heating');
  await page.getByLabel('When do you need service?').selectOption('This week');
  await page.getByRole('textbox', { name: /equipment|happening|details/i }).fill(canary);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('Full name').fill('Synthetic Test');
  await page.getByPlaceholder('Phone number').fill('2025550100');
  await page.getByPlaceholder('Email address').fill('synthetic@example.invalid');
  await page.getByRole('checkbox', { name: /I authorize Eternity/ }).check();
  await page.getByRole('checkbox', { name: /I acknowledge/ }).check();
}

test('accepted request counts one lead; errors and duplicate submissions do not', async ({ context, page }) => {
  const capture = await network(context);
  let attempts = 0;
  let accept;
  await page.route('**/api/service-request', async route => {
    attempts++;
    if (attempts === 1) return route.fulfill({ status: 503, json: { error: 'Synthetic temporary failure' } });
    await new Promise(resolve => { accept = resolve; });
    return route.fulfill({ json: { ok: true, confirmationSent: true } });
  });
  await page.goto('/#schedule'); await ready(page); await fillRequest(page);
  await page.getByRole('button', { name: 'Send request to Eternity' }).click();
  await expect(page.getByRole('alert')).toContainText('Synthetic temporary failure');
  expect(capture.events().filter(x => x.name === 'generate_lead')).toHaveLength(0);
  await page.locator('form.request-form').evaluate(form => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  await expect.poll(() => attempts).toBe(2);
  accept();
  await expect(page.getByText('Thank you. Your request is with Eternity.')).toBeVisible();
  await expect.poll(() => capture.events().filter(x => x.name === 'generate_lead').length).toBe(1);
  expect(capture.events().filter(x => x.name === 'service_form_complete')).toHaveLength(1);
  expect(JSON.stringify(capture.traffic)).not.toContain(canary);
  expect(JSON.stringify(capture.traffic)).not.toContain('synthetic@example.invalid');
  await page.getByRole('button', { name: 'Start another request' }).click();
  await fillRequest(page);
  await page.getByRole('button', { name: 'Send request to Eternity' }).click();
  await expect.poll(() => attempts).toBe(3);
  accept();
  await expect(page.getByText('Thank you. Your request is with Eternity.')).toBeVisible();
  await expect.poll(() => capture.events().filter(x => x.name === 'generate_lead').length).toBe(2);
});

test('throwing telemetry does not turn accepted service request into an error', async ({ context, page }) => {
  await network(context);
  await page.route('**/api/service-request', route => route.fulfill({ json: { ok: true, confirmationSent: false } }));
  await page.goto('/#schedule'); await ready(page); await fillRequest(page);
  await page.evaluate(() => { window.eternityAnalytics.track = () => { throw new Error('Synthetic sink failure'); }; });
  await page.getByRole('button', { name: 'Send request to Eternity' }).click();
  await expect(page.getByText('Thank you. Your request is with Eternity.')).toBeVisible();
});

test('private navigation before delayed tag load cancels pending marketing', async ({ context, page }) => {
  const capture = await network(context);
  await mockManagement(page);
  await page.goto('/'); await ready(page);
  await page.evaluate(token => history.pushState({}, '', `/appointment/manage#${token}`), canary);
  await expect(page.getByRole('heading', { name: 'Tuesday 9–11 AM' })).toBeVisible();
  await page.waitForTimeout(2700);
  expect(capture.traffic).toEqual([]);
});

test('first touch remains fixed while conversion page and native campaign can change', async ({ context, page }) => {
  const capture = await network(context);
  await page.goto('/services/boiler-service?utm_source=google&utm_medium=organic'); await loadTag(page, capture);
  const first = await page.evaluate(() => window.eternityAnalytics.getAttribution());
  await page.goto('/?utm_source=bing&utm_medium=referral'); await loadTag(page, capture);
  expect(await page.evaluate(() => window.eternityAnalytics.getAttribution())).toEqual(first);
  expect(first).toMatchObject({ landingPage: '/services/boiler-service', utmSource: 'google', utmMedium: 'organic' });
  const last = capture.events().filter(x => x.name === 'page_view').at(-1);
  expect(last.fields.campaign_source).toBe('bing');
  expect(last.fields.page_location).toBe('https://eternityhvacr.com/');
});

test('private referrers and invalid stored JSON cannot leak into a public visit', async ({ context, page }) => {
  const capture = await network(context);
  await context.addInitScript(canary => {
    Object.defineProperty(document, 'referrer', { get: () => location.origin + '/appointment/manage?token=' + canary + '#' + canary });
    sessionStorage.setItem('eternity_lead_attribution', '{broken_json');
  }, canary);
  await page.goto('/'); await loadTag(page, capture);
  expect(capture.events().every(x => x.fields.page_referrer === '')).toBeTruthy();
  expect(JSON.stringify(capture.traffic)).not.toContain(canary);
  expect(await page.evaluate(() => window.eternityAnalytics.getAttribution())).toEqual({ landingPage: '/' });
});

test('exact AI subdomains are classified without substring matches', async ({ context, page }) => {
  const capture = await network(context);
  await context.addInitScript(() => Object.defineProperty(document, 'referrer', { get: () => 'https://gemini.google.com/app/synthetic' }));
  await page.goto('/'); await loadTag(page, capture);
  const referrals = capture.events().filter(x => x.name === 'ai_referral_visit');
  expect(referrals).toHaveLength(1);
  expect(referrals[0].fields.ai_source).toBe('gemini');
  expect(referrals[0].fields.page_referrer).toBe('https://gemini.google.com/');
});

test('admin sign-in redirect remains outside marketing collection', async ({ context, page }) => {
  const capture = await network(context);
  await page.goto('/admin/second-opinions');
  await page.waitForTimeout(2700);
  expect(capture.traffic).toEqual([]);
  expect(page.url()).not.toBe('http://127.0.0.1:4179/');
});

for (const [slug, service, requestPath] of [
  ['furnace-heating-repair', 'Heating', 'Repair or diagnostic'],
  ['boiler-service', 'Boiler', 'Repair or diagnostic'],
  ['commercial-refrigeration', 'Refrigeration', 'Commercial / refrigeration'],
]) {
  test(`service journey: ${slug}, editable prefill and one accepted lead`, async ({ context, page }) => {
    const capture = await network(context);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const bodies = [];
    await page.route('**/api/service-request', route => {
      bodies.push(route.request().postDataJSON());
      return route.fulfill({ json: { ok: true, confirmationSent: true } });
    });
    await page.goto(`/services/${slug}`);
    const hero = page.locator('.service-hero-actions');
    const call = hero.getByRole('link', { name: 'Call 216-703-3183' });
    await expect(call).toHaveAttribute('href', 'tel:+12167033183');
    for (const link of await hero.getByRole('link').all()) {
      const box = await link.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.x + box.width).toBeLessThanOrEqual(390);
    }
    await page.screenshot({ path: `/private/tmp/eternity-${slug}-mobile.png`, fullPage: false });
    const request = hero.getByRole('link', { name: 'Request service' });
    await request.focus();
    await request.press('Enter');
    await expect(page).toHaveURL(new RegExp(`serviceScope=${slug}#schedule`));
    await expect(page.getByRole('radio', { name: requestPath })).toBeChecked();
    await page.locator('label').filter({ hasText: 'A managed property' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByLabel('Service category')).toHaveValue(service);
    await page.getByLabel('Service category').selectOption('Heat pump');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByLabel('Service category')).toHaveValue('Heat pump');
    await page.getByLabel('Service category').selectOption(service);
    await page.getByLabel('When do you need service?').selectOption('This week');
    await page.getByLabel('Property address', { exact: true }).fill('123 Synthetic Street');
    await page.getByRole('combobox', { name: 'Property type', exact: true }).selectOption('Rental home');
    await page.getByLabel('Affected units or buildings').fill('1');
    await page.getByLabel('Access arrangements').fill('Manager will coordinate');
    await page.getByRole('textbox', { name: /equipment|happening|details/i }).fill(canary);
    await expect(page.locator('.mobile-bar')).toBeHidden();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('combobox', { name: 'Your role', exact: true }).selectOption('Property owner');
    await page.getByRole('checkbox', { name: /I am the property owner/ }).check();
    await page.getByPlaceholder('Full name').fill('Synthetic Test');
    await page.getByPlaceholder('Phone number').fill('2025550100');
    await page.getByPlaceholder('Email address').fill('synthetic@example.invalid');
    await page.getByRole('checkbox', { name: /I authorize Eternity/ }).check();
    await page.getByRole('checkbox', { name: /I acknowledge/ }).check();
    await loadTag(page, capture);
    await page.getByRole('button', { name: 'Send request to Eternity' }).click();
    await expect(page.getByRole('status')).toContainText('Your request is with Eternity');
    expect(bodies).toHaveLength(1);
    expect(bodies[0]).toMatchObject({ service, requestType: requestPath });
    expect(bodies[0].attribution).toMatchObject({ landingPage: `/services/${slug}`, sourcePage: '/' });
    await expect.poll(() => capture.events().filter(x => x.name === 'generate_lead').length).toBe(1);
    expect(JSON.stringify(capture.traffic)).not.toContain(canary);
  });
}

test('invalid and conflicting handoffs are ignored; estimator still prefills', async ({ context, page }) => {
  await network(context);
  for (const query of ['serviceScope=__proto__', 'serviceScope=unknown', 'serviceScope=boiler-service&serviceScope=furnace-heating-repair', 'serviceScope=boiler-service&estimateScope=direct-furnace-swap']) {
    await page.goto(`/?${query}#schedule`); await ready(page);
    await expect(page.locator('input[name="requestType"]:checked')).toHaveCount(0);
  }
  await page.goto('/?estimateScope=direct-furnace-swap#schedule');
  await expect(page.getByRole('radio', { name: 'Installation estimate' })).toBeChecked();
});
