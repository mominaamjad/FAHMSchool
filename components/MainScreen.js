import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";


import Main from './layouts/Main';

import AdminLogin from './admin/AdminLogin'
import TeacherLogin from './teacher/TeacherLogin'
import StudentLogin from './student/StudentLogin'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen 
      name="Main" 
      component={MainScreen}
      options={{
        headerShown: false
      }}
        />
      <Stack.Screen name="Admin" component={AdminLogin} />
      <Stack.Screen name="Teacher" component={TeacherLogin} />
      <Stack.Screen name="Student" component={StudentLogin} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainScreen = ( { navigation }) => {

    return (
        <View style={styles.main}>
                
                <View style={styles.logoView}>
                <Image style={{height:250,width:250}}source={require('./assets/logo.png')}/>
                </View>
                <View style={styles.options}>
                    <Text style={styles.text}>Login as</Text>

                    <TouchableOpacity onPress={() => { navigation.navigate('Admin') }}>
                        <Main name={"Admin"} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Teacher') }}>
                        <Main name={"Teacher"} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Student') }}>
                        <Main name={"Student"} />
                    </TouchableOpacity>
                </View>
        </View>
    );
}

styles = StyleSheet.create({
   main: {
    backgroundColor: "#8349EA",
    flex:1,
    alignItems:'center'
   },

  //  textHeading: {
  //   fontFamily: 'Poppins-SemiBold',
  //       margin: 5,
  //       fontSize: 30,
  //       color: '#ffff'
  //  },

   logoView:{
    marginVertical:45
   },

    text: {
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        fontSize: 20,
        color: '#ffff'
    },

    options: {
        marginVertical: 10
    }
})

export default MyStack