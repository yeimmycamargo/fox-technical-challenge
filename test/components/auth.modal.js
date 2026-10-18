import { $, browser, expect } from '@wdio/globals';
import { step } from '../helpers/step.js';

/** Shared interaction for Demoblaze's two credential dialogs. */
export class AuthModal {
  constructor({ root, username, password, buttonText, name }) {
    this.selectors = { root, username, password };
    this.buttonText = buttonText;
    this.name = name;
  }

  get root() { return $(this.selectors.root); }
  get dialog() { return $(`${this.selectors.root} .modal-dialog`); }
  get username() { return $(this.selectors.username); }
  get password() { return $(this.selectors.password); }

  /** Verify both inputs before submitting, without exposing the password in failures.
   * @param {{username: string, password: string}} user
   */
  async submit(user) {
    await step(`Fill ${this.name} credentials and verify input values`, async () => {
      await expect(this.root).toBeDisplayed();
      await this.dialog.waitForStable();
      await this.username.click();
      await this.username.setValue(user.username);
      await this.password.click();
      await this.password.setValue(user.password);
      await browser.waitUntil(async () => {
        const username = await this.username.getValue();
        const password = await this.password.getValue();
        return username === user.username && password === user.password;
      }, {
        timeout: 5000,
        timeoutMsg: `${this.name} inputs did not retain the credentials before submission`,
      });
    });
    await this.root.$(`button=${this.buttonText}`).click();
  }
}
