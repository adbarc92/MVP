import firebaseApp from '../firebaseInit';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  getAuth
} from 'firebase/auth';

import { auth } from 'firebaseui';

console.log('firebaseApp:', firebaseApp);

const appAuth = getAuth(firebaseApp);

console.log('auth:', auth);

const ui = new auth.AuthUI(appAuth);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID
  ]
  // Other config options...
};

export const renderFirebaseAuth = (id: string): void => {
  ui.start(`#${id}`, uiConfig);
};
