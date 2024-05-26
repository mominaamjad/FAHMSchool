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
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import Admin from '../models/admin';
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
// export const fetchAdminData = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'admins'));
//     const dataList = querySnapshot.docs.map(doc => {
//       const data = doc.data();
//       return new Admin(
//         data.firstName,
//         data.lastName,
//         data.email,
//         data.password,
//       );
//     });
//     return dataList;
//   } catch (error) {
//     console.error('Error fetching admin data: ', error);
//   }
// };

// export const addAdmin = async adminData => {
//   try {
//     const docRef = await addDoc(collection(db, 'admins'), {
//       firstName: adminData.firstName,
//       lastName: adminData.lastName,
//       email: adminData.email,
//       password: adminData.password,
//     });
//     console.log('Admin added with ID: ', docRef.id);
//     return docRef.id;
//   } catch (error) {
//     console.error('Error adding admin: ', error);
//     throw error;
//   }
// };

// logging in

export const loginAdmin = async loginData => {
  try {
    console.log(loginData.email);
    console.log(loginData.password);

    const adminQuery = query(
      collection(db, 'admins'),
      where('email', '==', loginData.email),
      where('password', '==', loginData.password),
    );
    const querySnapshot = await getDocs(adminQuery);
    if (querySnapshot.empty) {
      throw new Error('Invalid email or password');
    }

    const adminDoc = querySnapshot.docs[0];
    const adminData = adminDoc.data();

    return new Admin(
      adminData.firstName,
      adminData.lastName,
      adminData.email,
      adminData.password,
    );
  } catch (error) {
    console.error('Error during login: ', error);
    throw error;
  }
};

export const assignClassToTeacher = async classData => {
  try {
  } catch (error) {
    console.error('Error Assigning Class To Teacher: ', error);
    throw error;
  }
};

export const addTeacher = async teacherData => {
  try {
    const teacherRef = await addDoc(collection(db, 'teachers'), {
      firstName: teacherData.firstName,
      lastName: teacherData.lastName,
      email: teacherData.email,
      password: teacherData.password,
      classRef: teacherData.classRef,
    });
    console.log('Teacher added with ID: ', teacherRef.id);
    return teacherRef.id;
  } catch (error) {
    console.error('Error adding Teacher: ', error);
    throw error;
  }
};

export const deleteTeacher = async teacherEmail => {
  try {
    const teacherRef = doc(db, 'teachers', teacherEmail);
    await deleteDoc(teacherRef);
    console.log('Teacher deleted with mail: ', teacherEmail);
  } catch (error) {
    console.error('Error deleting Teacher: ', error);
    throw error;
  }
};

export const createStudent = async studentData => {
  try {
  } catch (error) {
    console.error('Error creating Student: ', error);
    throw error;
  }
};

export const viewAllStudent = async () => {
  try {
  } catch (error) {
    console.error('Error viewing All Student: ', error);
    throw error;
  }
};

export const viewSpecificStudent = async studentId => {
  try {
  } catch (error) {
    console.error('Error viewing Specific Student: ', error);
    throw error;
  }
};

export const editStudent = async studentData => {
  try {
  } catch (error) {
    console.error('Error editing Student: ', error);
    throw error;
  }
};

export const deleteStudent = async studentId => {
  try {
  } catch (error) {
    console.error('Error deleting student: ', error);
    throw error;
  }
};

export const viewSpecificFeeStatus = async studentId => {
  try {
  } catch (error) {
    console.error('Error viewing specific fee status: ', error);
    throw error;
  }
};

export const viewAllFeeStatus = async () => {
  try {
  } catch (error) {
    console.error('Error viewing all fee status: ', error);
    throw error;
  }
};

export const createSpecificFeeStatus = async feeData => {
  try {
  } catch (error) {
    console.error('Error creating specific fee status: ', error);
    throw error;
  }
};

export const editSpecificFeeStatus = async feeData => {
  try {
  } catch (error) {
    console.error('Error editing specific fee status: ', error);
    throw error;
  }
};

export const deleteSpecificFeeStatus = async feeId => {
  try {
  } catch (error) {
    console.error('Error deleting specific fee status: ', error);
    throw error;
  }
};

export const viewStudentAgeRecord = async () => {
  try {
  } catch (error) {
    console.error('Error viewing student age record: ', error);
    throw error;
  }
};

export const viewResultSheet = async studentId => {
  try {
  } catch (error) {
    console.error('Error viewing Result Sheet: ', error);
    throw error;
  }
};

export const viewTimetable = async () => {
  try {
  } catch (error) {
    console.error('Error viewing Timetable: ', error);
    throw error;
  }
};

export const removeTimetable = async timetableId => {
  try {
  } catch (error) {
    console.error('Error removing Timetable: ', error);
    throw error;
  }
};

export const uploadTimetable = async timetableData => {
  try {
  } catch (error) {
    console.error('Error uploading Timetable: ', error);
    throw error;
  }
};

export const viewSpecificSyllabus = async syllabusId => {
  try {
  } catch (error) {
    console.error('Error viewing Specific Syllabus: ', error);
    throw error;
  }
};

export const uploadSyllabus = async syllabusData => {
  try {
  } catch (error) {
    console.error('Error uploading Syllabus: ', error);
    throw error;
  }
};

export const removeSyllabus = async syllabusId => {
  try {
  } catch (error) {
    console.error('Error removing Syllabus: ', error);
    throw error;
  }
};
