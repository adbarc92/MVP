import firebaseApp from '../firebaseInit';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
// const firebase = require('firebase');
// const firebaseui = require('firebaseui');
import firebaseui from 'firebaseui';

// console.log('firebase:', firebase);

const ui = new firebaseui.auth.AuthUI(getAuth(firebaseApp));

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
