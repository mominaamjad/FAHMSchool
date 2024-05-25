import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@env';
import {initializeApp} from 'firebase/app';
import {addDoc, collection, getDocs, getFirestore} from 'firebase/firestore';
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
export const fetchAdminData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'admin'));
    const dataList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dataList;
  } catch (error) {
    console.error('Error fetching admin data: ', error);
  }
};

export const addAdmin = async adminData => {
  try {
    const docRef = await addDoc(collection(db, 'admin'), adminData);
    console.log('Admin added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding admin: ', error);
    throw error;
  }
};
