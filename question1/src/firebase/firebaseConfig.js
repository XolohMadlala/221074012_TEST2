import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Shared test Firebase project: test2-a6b12.
// Firestore must contain/use the "tasks" collection.
const firebaseConfig = {
  apiKey: 'AIzaSyAKMooH58kd5GtVjvqATPGn3FwahJxml-w',
  authDomain: 'test2-a6b12.firebaseapp.com',
  projectId: 'test2-a6b12',
  storageBucket: 'test2-a6b12.firebasestorage.app',
  messagingSenderId: '24496848881',
  appId: '1:24496848881:web:436878bd061735c45c4e50',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
