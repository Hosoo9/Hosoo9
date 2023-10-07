import { test, expect } from '@playwright/test';
// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }, testInfo) => {
  // await reset()
  // await page.goto('https://my.start.url/');
});

test('home', async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText('Technician')).toBeVisible();
});
