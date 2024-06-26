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
import Admin from '../models/admin';
const fs = require('fs');
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
    console.log(adminQuery);
    const querySnapshot = await getDocs(adminQuery);
    console.log(querySnapshot.docs);

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
export const fetchClasses = async () => {
  try {
    const classesCollection = collection(db, 'classes');
    const classesSnapshot = await getDocs(classesCollection);
    const classesList = classesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        className: data.className,
        assigned: data.assigned || false,
        teacher: data.teacher || null,
      };
    });
    console.log(classesList);
    return classesList;
  } catch (error) {
    console.error('Error fetching classes: ', error);
    throw error;
  }
};

export const fetchTeachers = async () => {
  try {
    const teachersCollection = collection(db, 'teachers');
    const teachersSnapshot = await getDocs(teachersCollection);
    const teachersList = teachersSnapshot.docs.map(Teacherdoc => ({
      label: Teacherdoc.data().teacherName,
      value: Teacherdoc.id,
    }));
    const assignedTeachers = (await fetchClasses())
      .filter(cls => cls.teacher !== null)
      .map(cls => cls.teacher);

    const unassignedTeachers = teachersList.filter(
      teacher => !assignedTeachers.includes(teacher.value),
    );

    return unassignedTeachers;
  } catch (error) {
    console.error('Error fetching teachers: ', error);
    throw error;
  }
};

export const assignClassToTeacher = async classData => {
  try {
    const classDocRef = doc(db, 'classes', classData.classId);

    if (!classData.teacherId) {
      const teachersSnapshot = await getDocs(collection(db, 'teachers'));
      const batch = writeBatch(db);

      teachersSnapshot.forEach(doc => {
        if (doc.data().classRef === classData.classId) {
          batch.update(doc.ref, {classRef: null});
        }
      });

      await batch.commit();

      await updateDoc(classDocRef, {
        teacher: null,
        assigned: false,
      });
      return 'Unassign class successfully';
    } else {
      const teacherDocRef = doc(db, 'teachers', classData.teacherId);
      const teacherDocSnap = await getDoc(teacherDocRef);

      if (teacherDocSnap.exists()) {
        const teachersSnapshot = await getDocs(collection(db, 'teachers'));
        const batch = writeBatch(db);

        teachersSnapshot.forEach(doc => {
          if (doc.data().classRef === classData.classId) {
            batch.update(doc.ref, {classRef: null});
          }
        });

        await batch.commit();

        await updateDoc(teacherDocRef, {
          classRef: classData.classId,
        });

        await updateDoc(classDocRef, {
          teacher: classData.teacherId,
          assigned: true,
        });
      } else {
        throw new Error("Teacher document doesn't exist");
      }
    }
    return 'Class assigned successfully';
  } catch (error) {
    console.error('Error Assigning Class To Teacher: ', error);
    throw error;
  }
};

export const addTeacher = async teacherData => {
  try {
    const teacherRef = await addDoc(collection(db, 'teachers'), {
      teacherName: teacherData.teacherName,
      email: teacherData.email,
      password: teacherData.password,

      phoneNo: teacherData.phoneNo,
      address: teacherData.address,
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

export const addStudent = async studentData => {
  try {
    await setDoc(doc(db, 'students', studentData.regNo), {
      ...studentData,
    });
    console.log('Student added with ID: ', studentData.regNo);
    return studentData.regNo;
  } catch (error) {
    console.error('Error adding student: ', error);
    throw error;
  }
};

export const addStudentsFromFile = async filePath => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const students = JSON.parse(data);

    for (const student of students) {
      await addStudent(student);
    }
  } catch (error) {
    console.error('Error reading or parsing JSON file: ', error);
  }
};
export const viewAllStudent = async () => {
  try {
  } catch (error) {
    console.error('Error viewing All Student: ', error);
    throw error;
  }
};

export const fetchStudents = async () => {
  try {
    const studentCollection = collection(db, 'students');
    const studentSnapshot = await getDocs(studentCollection);
    const studentList = studentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(studentList);
    return studentList;
  } catch (error) {
    console.error('Error fetching students: ', error);
    throw error;
  }
};

export const fetchFees = async () => {
  try {
    const feeCollection = collection(db, 'fees');
    const feeSnapshot = await getDocs(feeCollection);
    const feeList = feeSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(feeList);
    return feeList;
  } catch (error) {
    console.error('Error fetching fees: ', error);
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

export const updateStudent = async (regNo, updatedData) => {
  try {
    const studentRef = doc(db, 'students', regNo);
    await updateDoc(studentRef, updatedData);
    console.log('Student updated with ID: ', regNo);
    return regNo;
  } catch (error) {
    console.error('Error updating student: ', error);
    throw error;
  }
};

export const deleteStudent = async studentId => {
  try {
    const docRef = doc(db, 'students', studentId);
    await deleteDoc(docRef);
    console.log(`Document with ID ${studentId} deleted successfully`);
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
export const updateFees = async (id, updatedData) => {
  try {
    const feesRef = doc(db, 'fees', id);
    await updateDoc(feesRef, updatedData);
    console.log('Fee updated with ID:', id);
    return id;
  } catch (error) {
    console.error('Error updating fee:', error);
    throw error;
  }
};

// const cleanObject = obj => {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([_, v]) => v !== undefined),
//   );
// };

export const createSpecificFeeStatus = async feeData => {
  try {
    console.log(feeData);
    console.log(feeData.id);
    await setDoc(doc(db, 'fees', feeData.id), {
      ...feeData,
    });
    console.log(feeData.amountDue);
    console.log('Fee added with ID: ', feeData.id);
    return feeData.id;
  } catch (error) {
    console.error('Error creating specific fee status: ', error);
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

export const uploadTimetable = async timetableData => {
  try {
    await setDoc(doc(collection(db, 'timetables'), timetableData.id), {
      timetableImg: timetableData.timetableImg,
    });
    console.log('TimeTable Uploaded: ', timetableData.id);
  } catch (error) {
    console.error('Error uploading Timetable: ', error);
    throw error;
  }
};

export const addClass = async classData => {
  try {
    await setDoc(doc(collection(db, 'classes'), classData.id), {
      classData: classData.className,
      subjects: classData.subjects,
    });
    console.log('class added: ', classData.id);
  } catch (error) {
    console.error('Error adding class: ', error);
    throw error;
  }
};

export const viewSpecificSyllabus = async classId => {
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

export const uploadSyllabus = async syllabusData => {
  try {
    console.log(syllabusData);
    const classDocRef = doc(db, 'classes', syllabusData.id);
    await updateDoc(classDocRef, {
      syllabus: syllabusData.syllabus,
    });
    console.log('Syllabus Uploaded: ', syllabusData.id);
  } catch (error) {
    console.error('Error uploading Syllabus: ', error);
    throw error;
  }
};
