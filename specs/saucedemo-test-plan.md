# Sauce Demo Checkout Test Plan

## User Story Summary
As a customer, I want to complete my purchase through a checkout process so that I can order products online.

The checkout flow should allow a logged-in user to review cart items, enter mandatory shipping information, review the order overview, finish the purchase, and receive a confirmation message. Validation and navigation flows must be covered.

## Test Scope
- Checkout process from product cart to order confirmation
- Form validation and error handling on checkout information
- Order overview accuracy and navigation
- Order completion and confirmation behavior
- Cancel and back navigation behavior
- Cross-browser coverage: Chromium, Firefox, WebKit

## Application URL
https://www.saucedemo.com

## Test Credentials
- Username: `standard_user`
- Password: `secret_sauce`

## Test Data
- First Name: `Test`
- Last Name: `User`
- Postal Code: `90210`

## Test Scenarios

### Scenario 1: Happy Path Checkout Flow
- Title: Complete checkout with valid information
- Preconditions: User is logged in and has at least one item in the cart
- Steps:
  1. Navigate to the application URL
  2. Log in with `standard_user` / `secret_sauce`
  3. Add the first product on the products page to the cart
  4. Open the shopping cart
  5. Verify cart item details: name, description, price, and quantity
  6. Verify total price calculation is displayed
  7. Click `Checkout`
  8. On checkout information page, enter `Test`, `User`, `90210`
  9. Click `Continue`
  10. On checkout overview page, verify order summary contains the selected item, payment details, shipping details, subtotal, tax, and total
  11. Click `Finish`
  12. Verify order confirmation page shows a success message and `Back Home` button
- Expected Result: Order is completed successfully and confirmation is displayed

### Scenario 2: Required Field Validation
- Title: Show error when checkout information fields are empty
- Preconditions: User is logged in and has items in cart
- Steps:
  1. Navigate to the cart and click `Checkout`
  2. Leave First Name empty, enter `User`, `90210`
  3. Click `Continue`
  4. Verify error message for missing first name
  5. Enter First Name, leave Last Name empty, click `Continue`
  6. Verify error message for missing last name
  7. Enter Last Name, leave Postal Code empty, click `Continue`
  8. Verify error message for missing postal code
- Expected Result: The checkout form blocks progress and shows accurate required field errors

### Scenario 3: Invalid Data Handling
- Title: Validate invalid checkout data before continuing
- Preconditions: User is on checkout information page
- Steps:
  1. Enter invalid values: `!@#$` for First Name, `1234` for Last Name, `ABCDE` for Postal Code
  2. Click `Continue`
  3. Observe validation behavior or error messaging
- Expected Result: The system should not proceed and should show appropriate feedback for invalid data or maintain mandatory validation behavior

### Scenario 4: Cart Review and Navigation
- Title: Review cart details and navigate back to products
- Preconditions: User is logged in and has item(s) in the cart
- Steps:
  1. Add a product to the cart
  2. Open the cart page
  3. Verify cart review content: item name, description, price, quantity, total
  4. Click `Continue Shopping`
  5. Verify the user returns to the products page
- Expected Result: Cart page displays full cart details and navigation returns user to product listing

### Scenario 5: Cancel Checkout and Return to Cart
- Title: Cancel checkout flow from overview page
- Preconditions: User has completed checkout information entry
- Steps:
  1. Complete checkout information and reach checkout overview page
  2. Click `Cancel`
  3. Verify the user is returned to the shopping cart page
- Expected Result: Checkout is cancelled and the cart remains intact for review or checkout retry

### Scenario 6: Order Confirmation Clears Cart
- Title: Verify cart is cleared after order completion
- Preconditions: User completes a checkout successfully
- Steps:
  1. Complete the checkout happy path
  2. Click `Back Home` on the confirmation page
  3. Open the cart page
  4. Verify the cart is empty
- Expected Result: Cart is cleared after successful order placement

## Coverage Mapping
- AC1: Scenario 1, Scenario 4
- AC2: Scenario 1, Scenario 2
- AC3: Scenario 1, Scenario 5
- AC4: Scenario 1, Scenario 6
- AC5: Scenario 2, Scenario 3

## Notes
- Use stable selectors such as `data-test` attributes when available
- Capture screenshots for the checkout flow and validation failures
- Verify behavior in Chromium, Firefox, and WebKit
