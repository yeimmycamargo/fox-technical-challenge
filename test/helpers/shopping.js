import { expect } from '@wdio/globals';
import Home from '../pages/home.page.js';
import Product from '../pages/product.page.js';
import Cart from '../pages/cart.page.js';
import Navbar from '../components/navbar.component.js';
import Alert from '../components/alert.component.js';
import { step } from './step.js';
/** Capture the selected product so cart checks use the values shown in its detail. */
export async function addProduct(data) {
  return step('Select product and accept the add-to-cart alert', async () => {
    await Home.selectProduct(data);
    await expect(Product.name).toHaveText(data.name);
    await expect(Product.price).toHaveText(/\$\d/);
    const selected = await Product.readProduct();
    await Product.addToCart();
    await expect(await Alert.readAndAccept()).toBe(data.addMessage);
    return selected;
  });
}
/** Check the single-product cart against the selected item and active account. */
export async function validateCart(selected, user) {
  await Navbar.openCart();
  await expect(Navbar.user).toHaveText(`Welcome ${user.username}`);
  await expect(Cart.rows).toBeElementsArrayOfSize(1);
  await expect(Cart.productName(selected.name)).toHaveText(selected.name);
  await expect(Cart.productPrice(selected.name)).toHaveText(String(selected.price));
  await expect(Cart.total).toHaveText(String(selected.price));
}
