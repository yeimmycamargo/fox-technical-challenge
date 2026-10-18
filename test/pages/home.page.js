import { browser, $ } from '@wdio/globals';
class HomePage {
  get categories() { return $('#cat'); }
  async open() { await browser.url('/index.html'); }
  async selectProduct(product) {
    await $(`a=${product.category}`).click();
    await $(`a=${product.name}`).click();
  }
}
export default new HomePage();
