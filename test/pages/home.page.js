import { browser, $ } from '@wdio/globals';

class HomePage {
  get categories() {
    return $('#cat');
  }

  category(name) {
    return $(`a=${name}`);
  }

  product(name) {
    return $(`a=${name}`);
  }

  async open() {
    await browser.url('/index.html');
  }

  async selectProduct({ category, name }) {
    await this.category(category).click();
    await this.product(name).click();
  }
}

export default new HomePage();
