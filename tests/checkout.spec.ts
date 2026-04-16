import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const FIRST_NAME = 'Test';
const LAST_NAME = 'User';
const POSTAL_CODE = '90210';

async function login(page) {
  await page.goto(BASE_URL);
  await expect(page).toHaveURL(BASE_URL + '/');
  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');
  await expect(page).toHaveURL(/.*inventory.html$/);
}

async function addFirstProductToCart(page) {
  const addButton = page.locator('.inventory_item button[data-test^="add-to-cart"]');
  await expect(addButton.first()).toBeVisible();
  await addButton.first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);
}

async function proceedToCheckout(page) {
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html$/);
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(/.*checkout-step-one.html$/);
}

async function fillCheckoutInformation(page, firstName, lastName, postalCode) {
  await page.fill('[data-test="firstName"]', firstName);
  await page.fill('[data-test="lastName"]', lastName);
  await page.fill('[data-test="postalCode"]', postalCode);
  await page.click('[data-test="continue"]');
}

test.describe('Sauce Demo Checkout Flow', () => {
  test('Complete checkout with valid information', async ({ page }) => {
    await login(page);
    await addFirstProductToCart(page);

    await proceedToCheckout(page);

    await fillCheckoutInformation(page, FIRST_NAME, LAST_NAME, POSTAL_CODE);
    await expect(page).toHaveURL(/.*checkout-step-two.html$/);

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total');
    await expect(page.locator('.summary_tax_label')).toContainText('Tax');
    await expect(page.locator('.summary_total_label')).toContainText('Total');

    await page.click('[data-test="finish"]');
    await expect(page).toHaveURL(/.*checkout-complete.html$/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });

  test('Show error when checkout information fields are empty', async ({ page }) => {
    await login(page);
    await addFirstProductToCart(page);
    await proceedToCheckout(page);

    await fillCheckoutInformation(page, '', LAST_NAME, POSTAL_CODE);
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');

    await fillCheckoutInformation(page, FIRST_NAME, '', POSTAL_CODE);
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');

    await fillCheckoutInformation(page, FIRST_NAME, LAST_NAME, '');
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('Review cart details and continue shopping', async ({ page }) => {
    await login(page);
    await addFirstProductToCart(page);

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart.html$/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toBeVisible();
    await expect(page.locator('.inventory_item_price')).toBeVisible();
    await expect(page.locator('.cart_quantity')).toHaveText('1');

    await page.click('[data-test="continue-shopping"]');
    await expect(page).toHaveURL(/.*inventory.html$/);
  });

  test('Cancel checkout and return to inventory', async ({ page }) => {
    await login(page);
    await addFirstProductToCart(page);
    await proceedToCheckout(page);

    await fillCheckoutInformation(page, FIRST_NAME, LAST_NAME, POSTAL_CODE);
    await expect(page).toHaveURL(/.*checkout-step-two.html$/);

    await page.click('[data-test="cancel"]');
    await expect(page).toHaveURL(/.*inventory.html$/);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);
  });

  test('Verify cart is cleared after order completion', async ({ page }) => {
    await login(page);
    await addFirstProductToCart(page);
    await proceedToCheckout(page);

    await fillCheckoutInformation(page, FIRST_NAME, LAST_NAME, POSTAL_CODE);
    await page.click('[data-test="finish"]');
    await expect(page).toHaveURL(/.*checkout-complete.html$/);

    await page.click('[data-test="back-to-products"]');
    await expect(page).toHaveURL(/.*inventory.html$/);
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});
