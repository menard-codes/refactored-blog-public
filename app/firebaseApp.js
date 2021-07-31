import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from 'config/firebaseApp.config';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// firebase services will be exported here
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export {firebase};
