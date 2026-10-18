import { loadData } from '../helpers/data.js';
import { getRunUser } from '../helpers/user.factory.js';
import { resetSession, register } from '../helpers/account.setup.js';
import { step } from '../helpers/step.js';
const data = loadData('users');
describe('Registration', () => {
  beforeEach(resetSession);
  for (const scenario of data.signup) {
    it(`${scenario.id} - ${scenario.name}`, async () => {
      const user = getRunUser();
      await step('Register and validate the new account confirmation', () => register(user, scenario.successMessage));
    });
  }
});
