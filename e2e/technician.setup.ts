import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('do login', async ({ page }) => {
  await page.goto("/");
  await page.getByLabel('Email').fill('technician@garudahashira.com');
  await page.getByLabel('Password').fill('somepassword');
  await page.getByText('Sign in with Credentials').click();

  // Wait until the page actually signs in.
  await expect(page.getByText('technician@garudahashira.com')).toBeVisible();

  await page.context().storageState({ path: STORAGE_STATE });
});
