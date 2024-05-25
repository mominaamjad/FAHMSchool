/* eslint-disable prettier/prettier */
// import {
//   FIREBASE_API_KEY,
//   FIREBASE_APP_ID,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_MEASUREMENT_ID,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
// } from '@env';
import {initializeApp} from 'firebase/app';
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import React, {useEffect} from 'react';
const firebaseConfig = {
  apiKey: 'AIzaSyCc10irQDB4le9CUCch7NpDqbPl_QuQKoY',
  authDomain: 'studentportalsystem01.firebaseapp.com',
  projectId: 'studentportalsystem01',
  storageBucket: 'studentportalsystem01.appspot.com',
  messagingSenderId: '946267194685',
  appId: '1:946267194685:web:58ce4e7628833b3fd13154',
  measurementId: 'G-LGBECZH699',
};

function App() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  useEffect(() => {
    console.log('mfkefmo');
  });

  const fetchData = async () => {
    try {
      console.log('hiihihi');

      const querySnapshot = await getDocs(collection(db, 'admin'));
      console.log('ijooj');

      const dataList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(dataList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  });
  return <></>;
}

export default App;
