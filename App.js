/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import {
  addAdmin,
  addTeacher,
  deleteTeacher,
  fetchAdminData,
  loginAdmin,
} from './api/admin';
import AdminMainScreen from './components/admin/AdminMainScreen';
import Admin from './models/admin';

import Teacher from './models/teacher';

import Marks from './models/marks';
import Student from './models/student';

import AdminMainScreen from './components/admin/AdminMainScreen';


function App() {
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
    // handleLogin();
    // handleAddTeacher();
    handleDeleteTeacher();
  });

  const handleLogin = async () => {
    try {
      const admin = await loginAdmin({
        email: 'fas.arsh@example.com',
        password: 'password123',
      });
      console.log(
        'Login Successful',
        `Welcome ${admin.firstName} ${admin.lastName}`,
      );
    } catch (error) {
      console.log('Login Failed', error.message);
    }
  };

  const handleDeleteTeacher = async () => {
    try {
      await deleteTeacher('teacher');
      console.log('Success', 'Teacher deleted successfully');
    } catch (error) {
      console.log('Error', 'Failed to delete teacher: ' + error.message);
    }
  };
  const handleAddTeacher = async () => {
    try {
      const newTeacher = new Teacher(
        'Fasiha',
        'Arshad',
        'fasiha@mail.com',
        'password123',
        'classref123',
      );
      const teacherID = await addTeacher(newTeacher);
      console.log('Teacher added with ID: ', teacherID);
    } catch (error) {
      console.error('Failed to add Teacher: ', error);
    }
  };

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

  return (
    <>
      <AdminMainScreen />
    </>
  );
}

export default App;
