import { $ } from '@wdio/globals';
class Navbar {
  get user() { return $('#nameofuser'); }
  get logout() { return $('#logout2'); }
  async openSignup() { await $('#signin2').click(); }
  async openLogin() { await $('#login2').click(); }
  async openCart() { await $('a=Cart').click(); }
}
export default new Navbar();
