import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import config from './config';

const {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
  firebaseMeasurementId
} = config.firebaseCredentials;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId
};

export const getUserIdToken = () =>
  getAuth().currentUser.getIdToken();

const initFbApp = () => {
  let appInitialized = false;

  return () => {
    if (!appInitialized) {
      appInitialized = true;
      initializeApp(firebaseConfig);
    }
  };
};

export default initFbApp();
