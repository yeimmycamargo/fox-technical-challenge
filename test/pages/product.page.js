import { $ } from '@wdio/globals';
class ProductPage {
  get name() { return $('#tbodyid h2.name'); }
  get price() { return $('#tbodyid h3.price-container'); }
  /** Read the displayed identity and numeric price for later cart comparisons. */
  async readProduct() {
    const name = await this.name.getText();
    const priceText = await this.price.getText();
    const match = priceText.match(/\$([\d,.]+)/);
    if (!match) throw new Error(`Unrecognized product price: ${priceText}`);
    return { name, price: Number(match[1].replaceAll(',', '')) };
  }
  async addToCart() { await $('a=Add to cart').click(); }
}
export default new ProductPage();
