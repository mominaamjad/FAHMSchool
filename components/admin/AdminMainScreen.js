/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import AdminDashboard from './AdminDashboard.js';
import AdminLogin from './AdminLogin.js';
import ClassesScreen from './ClassesScreen.js';
import FeeScreen from './FeeScreen.js';
import RecordsScreen from './RecordsScreen.js';
import SyllabusScreen from './SyllabusScreen.js';
import TimetableScreen from './TimetableScreen.js';
import { MainScreen } from '../MainScreen.js';

const Drawer = createDrawerNavigator();

const AdminMainScreen = () => {
  
  return (
    // <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            paddingVertical: 80,
            backgroundColor: '#b08feb',
            width: 250,
          },
          drawerLabelStyle: {
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
          },

          // headerTitle: "Welcome, Admin!",
          
          headerShadowVisible: false,
          headerLeftLabelVisible: true,
          headerStyle: {
            backgroundColor: '#9C70EA',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: 120,
          },

          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 22,
          },

          drawerActiveTintColor: '#BFA8E5',
        }}>
        <Drawer.Screen
          name="Dashboard"
          component={AdminDashboard}
          options={
            {
              // drawerIcon: () =>{
              //     <Icon name = "home-filled"/>
              // }
            }
          }
        />
        <Drawer.Screen name="Classes" component={ClassesScreen} />
        <Drawer.Screen name="Records" component={RecordsScreen} />
        <Drawer.Screen name="Fee" component={FeeScreen} />
        <Drawer.Screen name="Syllabus" component={SyllabusScreen} />
        <Drawer.Screen name="Timetable" component={TimetableScreen} />

        {/* yahan pe iss ko logout karao  */}
        <Drawer.Screen name="Logout" component={MainScreen} options={{headerShown: false}}/>
      </Drawer.Navigator>
       /* </NavigationContainer> */

    // <ScrollView>
    //     <Text>Admin Dashboard</Text>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default AdminMainScreen;
