import { test, expect } from '@playwright/test';

async function blockExternal(context, submissions) {
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.hostname !== '127.0.0.1') return route.abort();
    if (url.pathname === '/api/service-request') { submissions.push(route.request().postDataJSON()); return route.fulfill({ json: { ok:true, confirmationSent:true } }); }
    if (url.pathname.startsWith('/api/')) return route.abort();
    return route.continue();
  });
}
async function propertyDetails(page) {
  await page.getByLabel('Property address',{exact:true}).fill('123 Synthetic Street');
  await page.getByRole('combobox',{name:'Property type',exact:true}).selectOption('Apartment community');
  await page.getByLabel('Affected units or buildings').fill('2 units');
  await page.getByLabel('Access arrangements').fill('Manager meets technician');
  await page.getByLabel('Equipment or issue').fill('Synthetic PTAC service request');
}
async function contact(page) {
  await page.getByPlaceholder('Full name').fill('Synthetic Manager');
  await page.getByPlaceholder('Phone number').fill('2025550100');
  await page.getByPlaceholder('Email address').fill('synthetic@example.invalid');
  await page.getByRole('combobox',{name:'Your role',exact:true}).selectOption('Authorized property manager');
  await page.getByRole('checkbox',{name:/I authorize Eternity/}).check();
}

test('property page links, mobile layout and authorized paid request',async ({context,page})=>{
  const submissions=[]; await blockExternal(context,submissions);
  for(const width of [390,1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/multifamily-hvac');
    await expect(page.getByRole('heading',{level:1})).toHaveText('HVAC service for landlords & property managers.');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`/private/tmp/property-page-${width}.png`,fullPage:true});
  }
  await page.getByRole('link',{name:'Request property service'}).click();
  await expect(page).toHaveURL(/#schedule$/);
  await expect(page.getByRole('radio',{name:'My home',exact:true})).toHaveCount(0);
  await page.locator('label').filter({hasText:'Repair or diagnostic'}).click();
  await page.getByRole('button',{name:'Continue'}).click();
  await expect(page.getByRole('button',{name:'Continue'})).toBeDisabled();
  await propertyDetails(page);
  await page.getByLabel('Service category').selectOption('PTAC');
  await page.getByLabel('When do you need service?').selectOption('This week');
  await page.getByRole('button',{name:'Continue'}).click();
  await contact(page);
  const submit=page.getByRole('button',{name:'Send request to Eternity'});
  await expect(submit).toBeDisabled();
  await page.getByRole('checkbox',{name:/I acknowledge/}).check();
  await expect(submit).toBeDisabled();
  await page.getByRole('checkbox',{name:/I am the property owner/}).check();
  await submit.click();
  await expect(page.getByRole('status')).toContainText('Your request is with Eternity');
  expect(submissions).toHaveLength(1);
  expect(submissions[0]).toMatchObject({customer:'A managed property',managementAuthorized:true,service:'PTAC',propertyAddress:'123 Synthetic Street',feeAcknowledged:true});
});

test('free estimate and maintenance buttons prefill the management form',async ({context,page})=>{
  const submissions=[]; await blockExternal(context,submissions);
  await page.goto('/multifamily-hvac');
  await page.getByRole('link',{name:'Free replacement estimate',exact:true}).click();
  await expect(page.getByRole('radio',{name:/Installation estimate/})).toBeChecked();
  await page.getByRole('button',{name:'Continue'}).click();
  await propertyDetails(page);
  await page.getByRole('button',{name:'Continue'}).click();
  await contact(page);
  await expect(page.getByRole('checkbox',{name:/I acknowledge/})).toHaveCount(0);
  await page.getByRole('checkbox',{name:/I am the property owner/}).check();
  await page.getByRole('button',{name:'Send request to Eternity'}).click();
  await expect(page.getByRole('status')).toContainText('Your request is with Eternity');
  expect(submissions[0]).toMatchObject({requestType:'Installation estimate',feeAcknowledged:false,managementAuthorized:true});
  await page.goto('/multifamily-hvac');
  await page.getByRole('link',{name:'Discuss property maintenance'}).click();
  await expect(page.getByRole('radio',{name:/Preventive maintenance/})).toBeChecked();
  await page.getByRole('button',{name:'Continue'}).click();
  await expect(page.getByLabel('Service category')).toHaveValue('Maintenance');
});
