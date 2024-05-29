/* eslint-disable prettier/prettier */
// needs work still with navigation
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';

import { loginTeacher } from '../../api/teacher';

const Login = ( {navigation} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const teacher = await loginTeacher({
        email: email, 
        password: password,
      });
      if (teacher!=undefined){
        console.log(`Login Successful for ${teacher}`);
      setIsLoading(false)
        navigation.navigate('TeacherMainScreen', {teacher});
      }

    } catch (error) {
      console.log('Login Failed', error.message);
      setLoginError('Login failed. Please try again!');
      setIsLoading(false)
    }
  };

  const checkEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = emailRegex.test(email);
    if (!isValid) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const checkPassword = () => {
    if (password === '') {
      setPasswordError('Password is required');
      return false;
    }
    let isValid = password.length > 6;
    if (!isValid) {
      setPasswordError('Password must be at least 7 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  return (
    <View style={styles.alignment}>
      <View style={styles.container}>
        <Image source={require('../assets/teacherLogin.png')} style={styles.image} />
      </View>
      <Text style={styles.login}>Login as Teacher</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#333333'}
        onChangeText={text => setEmail(text)}
        onBlur={checkEmail}></TextInput>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#333333'}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        onBlur={checkPassword}></TextInput>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
      {isLoading ? <ActivityIndicator size="large" color='#8349EA' /> :
        <Text style={styles.submitText}>Login</Text> }
      </TouchableOpacity>
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 250,
  },
  login: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 30,
    padding: 20,
  },
  alignment: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
        height: 45,
        margin: 8,
        padding: 10,
        width: '80%', 
        borderWidth: 0.3,
        borderRadius: 8,
        color: "#333333",
        backgroundColor: '#F4F4F4',
        fontFamily: 'Poppins-Regular',
        fontSize: 13
    
  },

  submitButton: {
        backgroundColor: '#7239d6',
        borderRadius: 18,
        alignItems: 'center',
        width: 290, 
        height: 50,
        margin:20,
        elevation: 7,
        justifyContent: 'center'
  },

  submitText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color:'#ffffff',
        paddingTop: 7,
        alignSelf: 'center',
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
  },
  
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default Login;


// import Login from "../Login";
// import React from "react";

// const TeacherLogin = ()=>{
//     return (
//         <Login imagePath={} role="Teacher"></Login>
//     )
// }

// export default TeacherLogin;