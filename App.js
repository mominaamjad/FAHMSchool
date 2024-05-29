/* eslint-disable prettier/prettier */

import {useEffect} from 'react';
import {addClass, addTeacher, deleteTeacher} from './api/admin';

import {createStackNavigator} from '@react-navigation/stack';
import RecordsScreen from './components/admin/RecordsScreen';

import MyStack from './components/MainScreen';
import AdminMainScreen from './components/admin/AdminMainScreen';
function App() {
  // const fetchData = async () => {
  //   try {
  //     const dataList = await fetchAdminData();
  //     console.log(dataList);
  //   } catch (error) {
  //     console.error('Error fetching admin data: ', error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchData();
  //   // handleAddAdmin();
  //   // handleLogin();
  //   // handleAddTeacher();
  //   handleDeleteTeacher();
  // });

  const handleDeleteTeacher = async () => {
    try {
      await deleteTeacher('teacher');
      console.log('Success', 'Teacher deleted successfully');
    } catch (error) {
      console.log('Error', 'Failed to delete teacher: ' + error.message);
    }
  };
  const handleAddClass = async () => {
    try {
      await addClass({
        className: 'Class 1',
        subjects: [{name: 'name', subjectId: 'id'}],
      });
      console.log('Class added with ID: ');
    } catch (error) {
      console.error('Failed to add Class: ', error);
    }
  };
  const handleAddTeacher = async () => {
    try {
      await addTeacher({
        teacherName: 'Malva Burden',
        email: 'mburdenf@cbc.ca',
        password: 'qB0+7>QK!*P8vK',
        phoneNo: '130-442-2868',
        address: '7421 Macpherson Junction',
        classRef: '06',
      });
      console.log('Teacher added with ID: ');
    } catch (error) {
      console.error('Failed to add Teacher: ', error);
    }
  };

  useEffect(() => {
    // handleAddTeacher();
  });

  // const handleLogin = async () => {
  //   try {
  //     const admin = await loginAdmin({
  //       email: 'fas.arsh@example.com',
  //       password: 'password123',
  //     });
  //     console.log(
  //       'Login Successful',
  //       `Welcome ${admin.firstName} ${admin.lastName}`,
  //     );
  //   } catch (error) {
  //     console.log('Login Failed', error.message);
  //   }
  // };

  // const handleDeleteTeacher = async () => {
  //   try {
  //     await deleteTeacher('teacher');
  //     console.log('Success', 'Teacher deleted successfully');
  //   } catch (error) {
  //     console.log('Error', 'Failed to delete teacher: ' + error.message);
  //   }
  // };
  // const handleAddTeacher = async () => {
  //   try {
  //     const newTeacher = new Teacher(
  //       'Fasiha',
  //       'Arshad',
  //       'fasiha@mail.com',
  //       'password123',
  //       'classref123',
  //     );
  //     const teacherID = await addTeacher(newTeacher);
  //     console.log('Teacher added with ID: ', teacherID);
  //   } catch (error) {
  //     console.error('Failed to add Teacher: ', error);
  //   }
  // };

  // const handleAddAdmin = async () => {
  //   try {
  //     const newAdmin = new Admin(
  //       'mkmlm',
  //       'ksnkna',
  //       'fas.arsh@example.com',
  //       'password123',
  //     );
  //     const adminId = await addAdmin(newAdmin);
  //     console.log('Admin added with ID: ', adminId);
  //   } catch (error) {
  //     console.error('Failed to add admin: ', error);
  //   }
  // };

  const Stack = createStackNavigator();

  return (
    // this is the nav for teacher login to teacher dashboard. comment out for own use
    // <TimetableScreen />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Login"
    //     screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="Login" component={MyStack} />
    //     {/* <Stack.Screen name="TeacherMainScreen" component={TeacherMainScreen} /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>
    <RecordsScreen />
  );
}

export default App;
