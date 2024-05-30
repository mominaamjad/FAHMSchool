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
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

import Student from '../models/student';
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
// const db = firebase.firestore();

export const loginStudent = async (loginData) => {
  try {

      console.log(loginData.regNo);
      console.log(loginData.password);

      const studentQuery = query(
        collection(db, 'students'),
        where('regNo', '==', loginData.regNo),
        where('password', '==', loginData.password)            
    );

    console.log(studentQuery);


    const querySnapshot = await getDocs(studentQuery);
   
    console.log(querySnapshot.docs);

    if (querySnapshot.empty) {
      throw new Error('Invalid email or password');
    }

    const studentDoc = querySnapshot.docs[0];
    const studentData = studentDoc.data();

     // Use the spread operator to extract all data from the document
  const student = new Student({
    ...studentData,
  });
    console.log(student);
  return student;
    // return new Student(
    //   studentData.regNo = regNo,
    //   studentData.firstName = firstName,
    //   studentData.lastName = lastName,
    //   studentData.email = email,
    //   studentData.dob = dob,
    //   studentData.gender = gender,
    //   studentData.fatherName = fatherName,
    //   studentData.caste = caste,
    //   studentData.occupation = occupation,
    //   studentData.residence = residence,
    //   studentData.remarks = remarks,
    //   studentData.phoneNo = phoneNo,
    //   studentData.admissionDate = admissionDate,
    //   studentData.admissionClass = admissionClass,
      
    // );
  } catch (error) {
    console.error('Error during login: ', error);
    throw error;
  }
};

export const addStudent = async studentData => {
  try {
    const studentDocRef = doc(
      collection(db, 'students'),
      studentData.id || undefined,
    );
    await setDoc(studentDocRef, {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
    });
    console.log('Student added with ID: ', studentDocRef.id);
    return new Student(
      studentDocRef.id,
      studentData.firstName,
      studentData.lastName,
      studentData.email,
    );
  } catch (error) {
    console.error('Error adding student: ', error);
    throw error;
  }
};

export const getTimetable = async year => {
  try {
    const docRef = doc(db, 'timetables', year);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const timetableData = docSnap.data();
      return timetableData;
    } else {
      throw new Error('Timetable not found for the specified year');
    }
  } catch (error) {
    console.error('Error fetching timetable: ', error);
    throw error;
  }
};

export const viewSyllabus = async classId => {
  try {
    const docRef = doc(db, 'classes', classId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const syllabusData = docSnap.data();
      return syllabusData;
    } else {
      throw new Error('Timetable not found for the specified year');
    }
  } catch (error) {
    console.error('Error fetching timetable: ', error);
    throw error;
  }
};


export const currMarks = async regNo => {

  try {
    // Get the student's document reference
    const studentRef = doc(db, 'students', regNo);
    const studentDoc = await getDoc(studentRef);

    if (!studentDoc.exists()) {
      console.error('No such student!');
      return;
    }

    // Get the current class from the student's document
    const currentClass = studentDoc.data().currentClass;
    console.log(currentClass);
    // Get the class document based on the current class
    const classDoc = await getDoc(doc(db, 'classes', currentClass));

    if (!classDoc.exists()) {
      console.error('No such class!');
      return;
    }

    // Get all subjects from the class document
    const subjectsArray = classDoc.data().subjects;

    // Fetch all marks documents
    const marksSnapshot = await getDocs(collection(db, 'marks'));
    const marksArray = [];

    marksSnapshot.forEach((doc) => {
      const markData = doc.data();
      // Check if the mark's student reference matches the regNo
      if (markData.studentRef === regNo) {
        // Check if the mark's subject reference matches any subject in the subjectsArray
    const subjectMatch = subjectsArray.find(subject => subject.subjectId === markData.subjectRef);
    if (subjectMatch) {
      // Include subject.name along with other mark details
      marksArray.push({ ...markData, subjectName: subjectMatch.name });
    }
      }
    });
    console.log(marksArray);
    // setMarks(marksArray);
    return marksArray
  } catch (error) {
    console.error('Error fetching marks: ', error);
  }
}

export const getYears = async (regNo) => {

  try {
    // Get the student's document reference
    const studentRef = doc(db, 'students', regNo);
    const studentDoc = await getDoc(studentRef);

    if (!studentDoc.exists()) {
      console.error('No such student!');
      return;
    }

    // Get the current class from the student's document
    const currentClass = Number(studentDoc.data().currentClass);
    const admissionClass = Number(studentDoc.data().admissionClass);
    
    const yearsArr = []
    for (let i = admissionClass; i < currentClass; i++) {
      if(i >= 10){
        yearsArr.push(`${i}`)
      }
      else{
        yearsArr.push(`0${i}`)
      }
    }
    console.log(yearsArr);    
    return yearsArr
  } catch (error) {
    console.error('Error fetching marks: ', error);
  }
}

export const yearsMap = {
  '01' : 'Nursery',
  '02' : 'Prep',
  '03' : 'Class 1',
  '04' : 'Class 2',
  '05' : 'Class 3',
  '06' : 'Class 4',
  '07' : 'Class 5',
  '08' : 'Class 6',
  '09' : 'Class 7',
}

export const getMarksByYear = async (regNo, year) => {

  try {
    // Get the student's document reference
    const studentRef = doc(db, 'students', regNo);
    const studentDoc = await getDoc(studentRef);

    if (!studentDoc.exists()) {
      console.error('No such student!');
      return;
    }

    // Get the current class from the student's document
    // const currentClass = studentDoc.data().currentClass;

    // Get the class document based on the current class
    
    const classDoc = await getDoc(doc(db, 'classes', year));

    if (!classDoc.exists()) {
      console.error('No such class!');
      return;
    }

    // Get all subjects from the class document
    const subjectsArray = classDoc.data().subjects;

    // Fetch all marks documents
    const marksSnapshot = await getDocs(collection(db, 'marks'));
    const marksArray = [];

    marksSnapshot.forEach((doc) => {
      const markData = doc.data();
      // Check if the mark's student reference matches the regNo
      if (markData.studentRef === regNo) {
        // Check if the mark's subject reference matches any subject in the subjectsArray
    const subjectMatch = subjectsArray.find(subject => subject.subjectId === markData.subjectRef);
    if (subjectMatch) {
      // Include subject.name along with other mark details
      marksArray.push({ ...markData, subjectName: subjectMatch.name });
    }
      }
    });
    console.log(marksArray);
    return marksArray
  } catch (error) {
    console.error('Error fetching marks: ', error);
  }
}
