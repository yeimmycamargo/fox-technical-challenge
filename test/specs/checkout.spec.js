import { browser, expect } from '@wdio/globals';
import { loadData } from '../helpers/data.js';
import { getRunUser } from '../helpers/user.factory.js';
import { resetSession, prepareAccount } from '../helpers/account.setup.js';
import { step } from '../helpers/step.js';

import { addProduct, validateCart } from '../helpers/shopping.js';
import Cart from '../pages/cart.page.js';
import Home from '../pages/home.page.js';
import Checkout from '../components/checkout.modal.js';
import Navbar from '../components/navbar.component.js';
describe('Checkout', () => {
  beforeEach(resetSession);
  for (const scenario of loadData('checkout')) {
    it(`${scenario.id} - ${scenario.name}`, async () => {
      const user = getRunUser();
      await prepareAccount(user, scenario.signupMessage);
      const selected = await addProduct(scenario.product);
      await step('Precondition: validate the shopping cart', () => validateCart(selected, user));
      await step('Open checkout, validate total and fill customer details', async () => {
        await Cart.placeOrder();
        await expect(Checkout.root).toBeDisplayed();
        await expect(Checkout.total).toHaveText(`Total: ${selected.price}`);
        await Checkout.fill(scenario.customer);
      });
      await step('Purchase and validate receipt', async () => {
        await Checkout.purchase();
        await expect(Checkout.confirmation).toBeDisplayed();
        await expect(Checkout.title).toHaveText(scenario.confirmationTitle);
        const receipt = await Checkout.readReceipt();
        await expect(receipt.Id).toMatch(/^[1-9]\d*$/);
        await expect(receipt.Amount).toBe(`${selected.price} USD`);
        await expect(receipt['Card Number']).toBe(scenario.customer.card);
        await expect(receipt.Name).toBe(scenario.customer.name);
        // Known site defect: month is zero-based (getMonth()). Do not encode that as correct.
        // Check date presence/shape only; see docs/KNOWN_ISSUES.md.
        await expect(receipt.Date).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
      });
      await step('Close confirmation and verify return to home', async () => {
        await Checkout.confirm();
        await expect(browser).toHaveUrl('https://www.demoblaze.com/index.html');
        await expect(Home.categories).toBeDisplayed();
        await expect(Checkout.confirmation).not.toBeDisplayed();
        await expect(Navbar.user).toHaveText(`Welcome ${user.username}`);
      });
    });
  }
});
