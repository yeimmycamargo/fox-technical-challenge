import { $, $$ } from '@wdio/globals';
import { xpathLiteral } from '../helpers/xpath.js';

class CartPage {
  get rows() {
    return $$('#tbodyid tr');
  }

  get total() {
    return $('#totalp');
  }

  /** Match the cart row by product name, regardless of row order. */
  rowSelector(name) {
    return `//tbody[@id="tbodyid"]/tr[td[normalize-space(.)=${xpathLiteral(name)}]]`;
  }

  productRow(name) {
    return $(this.rowSelector(name));
  }

  productName(name) {
    return $(`${this.rowSelector(name)}/td[normalize-space(.)=${xpathLiteral(name)}]`);
  }

  productPrice(name) {
    // The price cell has no dedicated identifier in Demoblaze.
    return $(`${this.rowSelector(name)}/td[3]`);
  }

  async removeProduct(name) {
    await $(`${this.rowSelector(name)}//a[normalize-space(.)="Delete"]`).click();
  }

  async placeOrder() {
    await $('button=Place Order').click();
  }
}

export default new CartPage();
