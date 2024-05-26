/* eslint-disable prettier/prettier */
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
} from '@env';
import { initializeApp } from 'firebase/app';
import {
    collection,
    doc,
    getFirestore,
    setDoc
} from 'firebase/firestore';
import Marks from '../models/marks';
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const addMarks = async (marksData) => {
    try {
      const marksDocRef = doc(collection(db, 'marks'), marksData.id || undefined);
      await setDoc(marksDocRef, {
        studentRef: marksData.studentRef,
        subject: marksData.subject,
        score: marksData.score,
      });
      console.log('Marks added with ID: ', marksDocRef.id);
      return new Marks(marksDocRef.id, marksData.studentRef, marksData.subject, marksData.score);
    } catch (error) {
      console.error('Error adding marks: ', error);
      throw error;
    }
  };