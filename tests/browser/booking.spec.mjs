import { test, expect } from '@playwright/test';

test('booking page discloses fees and opens the existing residential flow without submitting a request', async ({ context, page }) => {
  const apiRequests = [];
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.hostname !== '127.0.0.1') return route.abort();
    if (url.pathname.startsWith('/api/')) {
      apiRequests.push(url.pathname);
      return route.abort();
    }
    return route.continue();
  });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/book');
    await expect(page.getByRole('heading', { name: 'Book service with Eternity.' })).toBeVisible();
    await expect(page.getByText('$149 after hours', { exact: true })).toBeVisible();
    await expect(page.getByText('$225 after hours', { exact: true })).toBeVisible();
    await expect(page.getByText('Sunday: emergencies only.', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.getByRole('link', { name: 'Get a free second opinion →' })).toHaveAttribute('href', '/second-opinion');
    await page.getByRole('button', { name: 'Start residential booking →' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Close service assistant' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Start residential booking →' })).toBeFocused();
  }
  expect(apiRequests).toEqual([]);
});

test('residential charges are visible before a live slot can be confirmed', async ({ context, page }) => {
  let confirmations = 0;
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.hostname !== '127.0.0.1') return route.abort();
    if (url.pathname === '/api/signmons') return route.fulfill({ json: {
      status: 'availability', reply: 'Synthetic local test availability.',
      jobId: '11111111-1111-4111-8111-111111111111',
      slots: [{ token: 'synthetic_local_slot_token_only', start: '2026-09-29T14:00:00Z', end: '2026-09-29T16:00:00Z', label: 'Tuesday, 10 a.m.–noon' }],
    } });
    if (url.pathname === '/api/signmons/appointments/confirm') {
      expect(route.request().postDataJSON().feeAcknowledged).toBe(true);
      confirmations++;
      return route.fulfill({ json: { status: 'appointment_confirmed', appointmentLabel: 'Tuesday, 10 a.m.–noon', jobReference: 'LOCALTEST', managementPath: '/appointment/manage#synthetic_local_token_only' } });
    }
    if (url.pathname.startsWith('/api/')) return route.abort();
    return route.continue();
  });
  await page.goto('/book');
  await page.getByRole('button', { name: 'Start residential booking →' }).click();
  await page.getByRole('dialog').locator('textarea').fill('Synthetic local booking check');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByText('Residential service charge: $99 during regular hours; $149 after hours ($99 + $50).', { exact: true })).toBeVisible();
  expect(confirmations).toBe(0);
  await expect(page.getByRole('button', { name: 'Tuesday, 10 a.m.–noon', exact: true })).toBeDisabled();
  await page.getByRole('checkbox', { name: /I acknowledge/ }).check();
  await page.getByRole('button', { name: 'Tuesday, 10 a.m.–noon', exact: true }).click();
  await expect(page.getByText(/Your residential diagnostic appointment is confirmed/)).toBeVisible();
  expect(confirmations).toBe(1);
});

test('free estimate stays free; switching to a paid request requires acknowledgment again', async ({ context, page }) => {
  const submissions = [];
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.hostname !== '127.0.0.1') return route.abort();
    if (url.pathname === '/api/service-request') { submissions.push(route.request().postDataJSON()); return route.fulfill({ json: { ok: true } }); }
    if (url.pathname.startsWith('/api/')) return route.abort();
    return route.continue();
  });
  await page.goto('/?serviceScope=installation-estimate#schedule');
  await expect(page.getByRole('radio', { name: /Installation estimate/ })).toBeChecked();
  await page.locator('label').filter({ hasText: 'My home' }).click();
  await page.getByRole('button', { name: 'Continue', exact: false }).click();
  await page.getByLabel('Equipment or issue').fill('Synthetic replacement estimate request');
  await page.getByRole('button', { name: 'Continue', exact: false }).click();
  await page.getByPlaceholder('Full name').fill('Synthetic Test');
  await page.getByPlaceholder('Phone number').fill('2025550100');
  await page.getByPlaceholder('Email address').fill('synthetic@example.invalid');
  await page.getByRole('checkbox', { name: /I authorize/ }).check();
  await expect(page.getByRole('checkbox', { name: /I acknowledge/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Send request to Eternity/ })).toBeEnabled();
  await page.getByRole('button', { name: /Back/ }).click();
  await page.getByRole('button', { name: /Back/ }).click();
  await page.locator('label').filter({ hasText: 'Repair or diagnostic' }).click();
  await page.getByRole('button', { name: 'Continue', exact: false }).click();
  await page.getByLabel('Service category').selectOption('Heating');
  await page.getByLabel('When do you need service?').selectOption('This week');
  await page.getByRole('button', { name: 'Continue', exact: false }).click();
  await expect(page.getByRole('button', { name: /Send request to Eternity/ })).toBeDisabled();
  await page.getByRole('checkbox', { name: /I acknowledge/ }).check();
  await expect(page.getByRole('button', { name: /Send request to Eternity/ })).toBeEnabled();
  await page.getByRole('button', { name: /Back/ }).click();
  await page.getByRole('button', { name: /Back/ }).click();
  await page.locator('label').filter({ hasText: 'A business' }).click();
  await page.getByRole('button', { name: 'Continue', exact: false }).click();
  await page.getByRole('button', { name: 'Continue', exact: false }).click();
  await expect(page.getByRole('checkbox', { name: /I acknowledge/ })).not.toBeChecked();
  await expect(page.getByRole('button', { name: /Send request to Eternity/ })).toBeDisabled();
  expect(submissions).toEqual([]);
});
