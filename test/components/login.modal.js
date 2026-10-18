import { AuthModal } from './auth.modal.js';

export default new AuthModal({
  root: '#logInModal',
  username: '#loginusername',
  password: '#loginpassword',
  buttonText: 'Log in',
  name: 'login',
});
