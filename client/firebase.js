import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseCredentials } from './config';

const {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
  firebaseMeasurementId
} = firebaseCredentials;

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

export default firebase.initializeApp(firebaseConfig);
