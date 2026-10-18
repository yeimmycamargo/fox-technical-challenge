import { AuthModal } from './auth.modal.js';

export default new AuthModal({
  root: '#signInModal',
  username: '#sign-username',
  password: '#sign-password',
  buttonText: 'Sign up',
  name: 'signup',
});
