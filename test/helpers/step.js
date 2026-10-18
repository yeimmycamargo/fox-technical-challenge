import allure from '@wdio/allure-reporter';
import { nextStep, log, capture } from './evidence.js';

/** Record one business step and keep its original error if evidence collection fails.
 * @template T
 * @param {string} title
 * @param {() => Promise<T>} action
 * @returns {Promise<T>}
 */
export async function step(title, action) {
  const name = nextStep(title);
  const started = Date.now();
  let status = 'failed';
  allure.startStep(title);
  log('START', name);
  try {
    const result = await action();
    status = 'passed';
    return result;
  } finally {
    try {
      log(status.toUpperCase(), name, Date.now() - started);
      await capture(`${name}-${status}`);
    } catch {
      console.warn(`Evidence could not be saved for ${name}`);
    } finally {
      allure.endStep(status);
    }
  }
}
