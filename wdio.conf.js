import { initializeRunUser, disposeRunUser } from './test/helpers/user.factory.js';
import { loadData } from './test/helpers/data.js';
import { browser } from '@wdio/globals';
import { beginEvidence, capture, finishEvidence } from './test/helpers/evidence.js';

const suites = Object.fromEntries(
  ['signup', 'login', 'cart', 'checkout'].map(name => [name, [`./test/specs/${name}.spec.js`]]),
);

export const config = {
  runner: 'local',
  onPrepare: () => initializeRunUser(loadData('users').template),
  onComplete: disposeRunUser,
  specs: [Object.values(suites).flat()],
  suites,
  maxInstances: 1,
  capabilities: [{ browserName: 'chrome', 'wdio:enforceWebDriverClassic': true, unhandledPromptBehavior: 'ignore',
    'goog:chromeOptions': { args: ['--window-size=1440,1000', ...(process.env.HEADLESS === 'true' ? ['--headless=new'] : [])] } }],
  baseUrl: 'https://www.demoblaze.com',
  logLevel: 'error',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 120000 },
  specFileRetries: 0,
  reporters: ['spec', ['allure', {
    outputDir: 'allure-results', disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true, disableMochaHooks: false,
  }]],
  before: async () => {
    await browser.setTimeout({ implicit: 0, pageLoad: 60000, script: 30000 });
  },
  beforeTest: (test) => beginEvidence(test.title),
  afterTest: async (_test, _context, { error }) => {
    if (error) await capture('test-failure');
    finishEvidence(!error);
  },
  afterHook: async (_test, _context, { error }) => {
    if (error) await capture('hook-failure');
  },
};
