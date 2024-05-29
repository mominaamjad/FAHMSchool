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
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import Teacher from '../models/teacher';
import Class from '../models/class';

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

export const loginTeacher = async (loginData) => {
    try {
        console.log(loginData.email);
        console.log(loginData.password);

        const teacherQuery = query(
            collection(db, 'teachers'),
            where('email', '==', loginData.email),
            where('password', '==', loginData.password)
        );
        console.log(teacherQuery);
        const querySnapshot = await getDocs(teacherQuery);
        console.log(querySnapshot.docs);

        if (querySnapshot.empty) {
            throw new Error('Invalid email or password if wala eror');
        }

        const teacherDoc = querySnapshot.docs[0];
        const teacherData = teacherDoc.data();

        return new Teacher(
            teacherData.teacherName,
            teacherData.phoneNo,
            teacherData.address,
            teacherData.classRef,
            teacherData.email,
            teacherData.password,
        );
    } catch (error) {
        console.error('Error during login: cath error', error);
        throw error;
    }
};

export const viewSubjects = async (teacher) => {
    try {
        console.log(teacher.teacherName);
        console.log(teacher.classRef);
        
        const classQuery = query(
            collection(db, 'classes'),
            where('__name__', '==', teacher.classRef),
        );
        // console.log(classQuery);
        const querySnapshot = await getDocs(classQuery);
        console.log(querySnapshot.docs);

        if (querySnapshot.empty) {
            throw new Error('Invalid reuqest (querySnapshot empty)');
        }

        const classDoc = querySnapshot.docs[0];
        const classData = classDoc.data();
        console.log("classData:",classData);

        const assignedClass = new Class(
            classData.assigned,
            classData.className,
            classData.subjects,
            classData.teacherId,
            classData.syllabus,
        );
        console.log("assignedClass",assignedClass.subjects);
        return assignedClass.subjects;
    } catch (error) {
        console.error('Error retrieving class data', error.message);
        throw error;
    }
};


// export const viewFirstTermMarks = () =>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const viewMidMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const viewFinalMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const editFirstTermMarks = () =>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const editMidMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const editFinalMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const deleteFirstTermMarks = ()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const deleteMidMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const deleteFinalMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }