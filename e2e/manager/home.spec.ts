import { test, expect } from '@playwright/test';
import { resetDb } from "@/utils/test-helpers"
import factories from "../../__tests__/factories"
import prisma from '../../src/utils/prisma';

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }, testInfo) => {
  await resetDb()
  // await page.goto('https://my.start.url/');
});

test('home', async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText('Manager')).toBeVisible();
});

test('operation listing', async ({ page }) => {
  const user = await prisma.user.findUnique({ where: { email: "manager@garudahashira.com"} })
  const operation = await factories.operationFactory.create({ createdBy: user.id })

  await page.goto("/en/dashboard");

  await expect(page.getByText('Operation list')).toBeVisible();
  await expect(page.getByText(operation.name)).toBeVisible();
});

test('operation create', async ({ page }) => {
  const user = await prisma.user.findUnique(
    { where: { email: "manager@garudahashira.com"} })

  await page.goto("/en/operation/new");

  await expect(page.getByText("Enter application details")).toBeVisible();

  await page.getByLabel("Work type").click()
  await page.getByRole('option', { name: 'New installation' }).click()

  await page.getByLabel('Propane').click()
  await page.getByLabel('Cash').click()

  await page.getByTestId('applicationDate').click()
  await page.locator(`[data-today="true"]`).last().click()

  await page.getByTestId('desiredDate').click()
  await page.locator(`[data-today="true"]`).last().click()

  await page.getByLabel("Remarks").fill('some remark')
  await page.getByTestId("customerNumber").fill("CN1234")

  await page.getByTestId("postCode").fill("3650056")
  // await page.getByRole('button', { name: 'Address Auto Fill' }).click()
  await page.getByTestId('prefectures').fill("Some prefectures")
  await page.getByTestId('municipalities').fill("Some municipalities")

  await page.getByTestId('address').fill("Some address")
  await page.getByTestId('buildingNameRoomNumber').fill("BUILDING123R2")
  await page.getByLabel('Detached House').click()

  await page.getByLabel('Name/company name').fill("Abo")
  await page.getByLabel('Furigana').fill("Abokata")


  await page.getByLabel("Phone Number Type").click()
  await page.getByRole('option', { name: 'Workplace' }).click()

  // await page.getByTestId('phoneNumber').fill("22222222222")

  await page.getByTestId('mailAddress').fill("abo@test.com")

  await page.getByLabel('Individual').click()

  await page.getByRole('button', { name: 'Save' }).click()

  // expect(page).toHaveURL('/en/dashboard')
  await expect(page.getByText('Operation list')).toBeVisible();

  // OLD
  // const options = { day: 'numeric', month: 'long', year:'numeric' }
  // const formattedDate = format(new Date(), "dd MMMM yyyy")

});

test('operation reset', async ({ page }) => {
  const user = await prisma.user.findUnique(
    { where: { email: "manager@garudahashira.com"} })

  await page.goto("/en/operation/new");

  await expect(page.getByText("Enter application details")).toBeVisible();

  await page.getByLabel("Work type").click()
  await page.getByRole('option', { name: 'New installation' }).click()

  await page.getByLabel('Propane').click()
  await page.getByLabel('Cash').click()

  await page.getByTestId('applicationDate').click()
  await page.locator(`[data-today="true"]`).click()

  await page.getByTestId('desiredDate').click()
  await page.locator(`[data-today="true"]`).click()

  await page.getByLabel("Remarks").fill('some remark')
  await page.getByTestId("customerNumber").fill("CN1234")

  await page.getByTestId("postCode").fill("3650056")
  await page.getByRole('button', { name: 'Address Auto Fill' }).click()

  await page.getByTestId('prefectures').fill("Some prefectures")
  await page.getByTestId('municipalities').fill("Some municipalities")

  await page.getByTestId('buildingNameRoomNumber').fill("BUILDING123R2")
  await page.getByLabel('Detached House').click()

  await page.getByLabel('Name/company name').fill("Abo")
  await page.getByLabel('Furigana').fill("Abokata")

  await page.getByTestId('phoneNumber').fill("1234567")

  await page.getByLabel("Phone Number Type").click()
  await page.getByRole('option', { name: 'Workplace' }).click()

  await page.getByTestId('mailAddress').fill("abo@test.com")

  await page.getByLabel('Individual').click()
  await page.getByRole('button', { name: 'Reset' }).click()

  expect(await page.getByTestId("customerNumber").inputValue()).toBe("")
});
