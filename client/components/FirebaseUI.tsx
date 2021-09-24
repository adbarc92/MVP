import firebaseApp from '../firebaseInit';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  getAuth
} from 'firebase/auth';

import { auth } from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const appAuth = getAuth(firebaseApp);

const ui = new auth.AuthUI(appAuth);

const uiConfig = {
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID
  ]
  // Other config options...
};

export const renderFirebaseAuth = (id: string): void => {
  ui.start(`#${id}`, uiConfig);
};
