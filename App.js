/* eslint-disable prettier/prettier */

import {doc, getFirestore} from 'firebase/firestore';
import React, {useEffect} from 'react';
import {addAdmin, fetchAdminData} from './api/admin';
import {addMarks} from './api/marks';
import {addStudent} from './api/student';
import Admin from './models/admin';
import Marks from './models/marks';
import Student from './models/student';
function App() {
  const db = getFirestore();
  const fetchData = async () => {
    try {
      const dataList = await fetchAdminData();
      console.log(dataList);
    } catch (error) {
      console.error('Error fetching admin data: ', error);
    }
  };

  useEffect(() => {
    // fetchData();
    // handleAddAdmin();
    handleAddStudentAndMarks();
  });

  const handleAddAdmin = async () => {
    try {
      const newAdmin = new Admin(
        'mkmlm',
        'ksnkna',
        'fas.arsh@example.com',
        'password123',
      );
      const adminId = await addAdmin(newAdmin);
      console.log('Admin added with ID: ', adminId);
    } catch (error) {
      console.error('Failed to add admin: ', error);
    }
  };

  const handleAddStudentAndMarks = async () => {
    try {
      const newStudent = new Student(
        null,
        'John',
        'Doe',
        'john.doe@example.com',
      );
      const addedStudent = await addStudent(newStudent);
      console.log('Student added with ID: ', addedStudent.id);
      const studentRef = doc(db, 'students', addedStudent.id);
      const newMarks = new Marks(null, studentRef, 'Math', 95);
      const addedMarks = await addMarks(newMarks);
      console.log('Marks added with ID: ', addedMarks.id);
    } catch (error) {
      console.error('Failed to add student or marks: ', error);
    }
  };
  return <></>;
}

export default App;
