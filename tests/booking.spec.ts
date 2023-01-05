import { test, expect } from '@playwright/test';
import { Console } from 'console';
import moment from 'moment';


test('getting input values for booking', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click('#book-reservation')

  const roomsizeInput = page.getByLabel(" Room Size");
  await roomsizeInput.type("buisness suite");

  const roomquantityInput = page.getByLabel('Room Quantity');
  await roomquantityInput.type("1");

  const firstNameInput = page.getByLabel('First Name');
  await firstNameInput.type("Navjot");

  const lastNameInput = page.getByLabel('Last Name');
  await lastNameInput.type("singh");

  const emailInput = page.getByLabel('E-Mail');
  await emailInput.type("navjot8059@gmial.com");

  const phoneInput = page.getByLabel('Phone Number');
  await phoneInput.type("4373453013");

  const streetNameInput = page.getByLabel('Street Name');
  await streetNameInput.type("bonaventrure drive");

  const streetNumberInput = page.getByLabel('Street Number');
  await streetNumberInput.type("3066");

  const zipcodeInput = page.getByLabel('ZipCode');
  await zipcodeInput.type(" L4T2J2");

  const stateInput = page.getByLabel('State');
  await stateInput.type("Mississauga");

  const cityInput = page.getByLabel('City');
  await cityInput.type("ontario");

  const noteInput = page.getByLabel('Personal Note');
  await noteInput.type("dfgdgdf");

});

test('working with checkbox and radio buttons', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click('#book-reservation')

  const checkbox = page.locator('id=confirm');
  const reminder = page.locator("(//input[@type='checkbox'])[1]");
  const newsletter = page.locator("(//input[@type='checkbox'])[2]");
  const radioButton = page.locator("//input[@value='credit card']");

  await expect(checkbox).toBeVisible();
  await expect(checkbox).not.toBeChecked();
  await checkbox.check();
  await expect(checkbox).toBeChecked();

  await expect(radioButton).toBeVisible();
  await expect(radioButton).not.toBeChecked();
  await radioButton.check();
  await expect(radioButton).toBeChecked();

  await expect(reminder).toBeVisible();
  await expect(reminder).toBeChecked();
  await reminder.uncheck();
  await expect(newsletter).toBeVisible();
  await expect(newsletter).toBeChecked();
  await newsletter.uncheck();



  expect(await page.locator("//input[@value='paypal']").isChecked()).toBeFalsy();
  expect(await page.locator("//input[@value='cash']").isChecked()).toBeFalsy();
  expect(await page.locator("//input[@value='bitcoin']").isChecked()).toBeFalsy();




});

test('working with datepicker', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('#book-reservation')

  let date = "11/18/2021"

  await page.fill("id=:rd:", date)
  await page.waitForTimeout(3000)

});

test('working with multi select', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('#book-reservation')

  await page.click('id=demo-multiple-name')
  await page.waitForTimeout(3000)

  await page.click("(//li[@role='option'])[2]")
  await page.click("(//li[@role='option'])[3]")
  await page.click("(//li[@role='option'])[5]")
})







