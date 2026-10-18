import { randomUUID, randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';

/** Create one temporary account file shared by the sequential suite. */
export function initializeRunUser(template) {
  const directory = resolve('.runtime', randomUUID());
  mkdirSync(directory, { recursive: true });
  process.env.DEMOBLAZE_ACCOUNT_FILE = join(directory, 'account.json');
  const account = {
    username: `${template.prefix}${randomBytes(4).toString('hex')}@${template.domain}`,
    password: process.env.TEST_PASSWORD || `Demo!${randomUUID()}`,
    registered: false,
  };
  writeFileSync(process.env.DEMOBLAZE_ACCOUNT_FILE, JSON.stringify(account), { mode: 0o600 });
}
function accountPath() {
  if (!process.env.DEMOBLAZE_ACCOUNT_FILE) throw new Error('Run account is missing. Execute tests with the WebdriverIO configuration.');
  return process.env.DEMOBLAZE_ACCOUNT_FILE;
}
/** Return the current run credentials; this does not create a site account. */
export function getRunUser() {
  const { username, password } = readAccount();
  return { username, password };
}
export function isAccountRegistered() {
  return readAccount().registered;
}
/** Mark registration only after its UI confirmation has passed. */
export function markAccountRegistered() {
  const account = readAccount();
  account.registered = true;
  writeFileSync(accountPath(), JSON.stringify(account), { mode: 0o600 });
}

function readAccount() {
  return JSON.parse(readFileSync(accountPath(), 'utf8'));
}

/** Remove only this run's credential directory after execution. */
export function disposeRunUser() {
  if (!process.env.DEMOBLAZE_ACCOUNT_FILE) return;
  rmSync(dirname(accountPath()), { recursive: true, force: true });
  delete process.env.DEMOBLAZE_ACCOUNT_FILE;
}
