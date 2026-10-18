import { loadData } from '../helpers/data.js';
import { getRunUser } from '../helpers/user.factory.js';
import { resetSession, prepareAccount, login } from '../helpers/account.setup.js';
import { step } from '../helpers/step.js';
const data = loadData('users');
describe('Login', () => {
  beforeEach(resetSession);
  for (const scenario of data.login) {
    it(`${scenario.id} - ${scenario.name}`, async () => {
      const user = getRunUser();
      await prepareAccount(user, scenario.signupMessage, { authenticate: false });
      await step('Log in and validate the exact username in the header', () => login(user));
    });
  }
});
