import { expect } from '@wdio/globals';
import Cart from '../pages/cart.page.js';
import { loadData } from '../helpers/data.js';
import { getRunUser } from '../helpers/user.factory.js';
import { resetSession, prepareAccount } from '../helpers/account.setup.js';
import { step } from '../helpers/step.js';

import { addProduct, validateCart } from '../helpers/shopping.js';
describe('Cart', () => {
  beforeEach(resetSession);
  for (const scenario of loadData('products')) {
    it(`${scenario.id} - ${scenario.name}`, async () => {
      const user = getRunUser();
      await prepareAccount(user, scenario.signupMessage);
      const selected = await addProduct(scenario.product);
      await step('Validate product identity, price and cart total', () => validateCart(selected, user));
      await step('Remove the test product from the shared account cart', async () => {
        await Cart.removeProduct(selected.name);
        await expect(Cart.rows).toBeElementsArrayOfSize(0);
      });
    });
  }
});
