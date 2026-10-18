import { browser } from '@wdio/globals';

class AlertComponent {
  /** Wait for a native alert before reading and accepting it. */
  async readAndAccept() {
    await browser.waitUntil(() => browser.isAlertOpen(), {
      timeout: 15000,
      interval: 300,
      timeoutMsg: 'The expected native alert did not appear within 15 seconds.',
    });

    const text = await browser.getAlertText();
    await browser.acceptAlert();
    return text;
  }
}

export default new AlertComponent();
