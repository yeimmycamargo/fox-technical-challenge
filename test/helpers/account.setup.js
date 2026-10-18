import { isAccountRegistered, markAccountRegistered } from './user.factory.js';
import { log } from './evidence.js';
import { browser, expect } from '@wdio/globals';
import Home from '../pages/home.page.js';
import Navbar from '../components/navbar.component.js';
import Signup from '../components/signup.modal.js';
import Login from '../components/login.modal.js';
import Alert from '../components/alert.component.js';
import { step } from './step.js';
/** Start a clean browser session while keeping the shared account. */
export async function resetSession() {
  await browser.reloadSession();
  await Home.open();
}
export async function register(user, expectedMessage) {
  await Navbar.openSignup();
  await Signup.submit(user);
  const message = await Alert.readAndAccept();
  await expect(message).toBe(expectedMessage);
  await expect(Signup.root).not.toBeDisplayed();
  markAccountRegistered();
}
export async function login(user) {
  await Navbar.openLogin();
  await Login.submit(user);
  await expect(Navbar.user).toHaveText(`Welcome ${user.username}`);
  await expect(Navbar.user).toBeDisplayed();
  await expect(Navbar.logout).toBeDisplayed();
}
/** Register through the UI only when needed; optionally authenticate afterwards. */
export async function prepareAccount(user, message, { authenticate = true } = {}) {
  if (!isAccountRegistered()) {
    await step('Precondition: register the shared run account through the UI', () => register(user, message));
  } else {
    log('PRECONDITION', `Reuse registered account: ${user.username}`);
  }
  if (authenticate) await step('Precondition: authenticate the account', () => login(user));
}
