import { $, $$ } from '@wdio/globals';
class CartPage {
  get rows() { return $$('#tbodyid tr'); }
  get productName() { return $('#tbodyid tr td:nth-child(2)'); }
  get productPrice() { return $('#tbodyid tr td:nth-child(3)'); }
  get total() { return $('#totalp'); }
  async removeProduct() { await $('a=Delete').click(); }
  async placeOrder() { await $('button=Place Order').click(); }
}
export default new CartPage();
