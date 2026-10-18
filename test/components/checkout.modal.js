import { $, expect } from '@wdio/globals';
class CheckoutModal {
  get root() { return $('#orderModal'); }
  get total() { return $('#totalm'); }
  get confirmation() { return $('.sweet-alert'); }
  get title() { return $('.sweet-alert h2'); }
  get receipt() { return $('.sweet-alert p'); }
  async fill(data) {
    await $('#orderModal .modal-dialog').waitForStable();
    for (const field of ['name', 'country', 'city', 'card', 'month', 'year']) {
      await $(`#${field}`).setValue(data[field]);
      await expect($(`#${field}`)).toHaveValue(data[field]);
    }
  }
  async purchase() { await this.root.$('button=Purchase').click(); }
  /** Split receipt labels at the first colon, preserving colons inside values. */
  async readReceipt() {
    const text = await this.receipt.getText();
    return Object.fromEntries(text.split('\n').map(line => {
      const colon = line.indexOf(':');
      return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
    }));
  }
  /** Wait for SweetAlert readiness so OK triggers its navigation callback. */
  async confirm() {
    await $('.sweet-alert.visible').waitForExist({
      timeoutMsg: 'Purchase confirmation did not become ready for interaction',
    });
    await $('.sweet-alert.visible button.confirm').click();
  }
}
export default new CheckoutModal();
