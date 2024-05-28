/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { loginAdmin } from '../../api/admin';

const Login = ( {navigation} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const handleLogin = async () => {
    try {
      const admin = await loginAdmin({
        email: email,
        password: password,
      });
      console.log(
        'Login Successful',
        `Welcome ${admin.firstName} ${admin.lastName}`,
      );
      navigation.navigate('AdminMainScreen')
    } catch (error) {
      console.log('Login Failed', error.message);
      setLoginError('Login failed. Please try again!');
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
        <Image source={require('../assets/adminLogin.png')} style={styles.image} />
      </View>
      <Text style={styles.login}>Login as Admin</Text>
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
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.submitText}>Login</Text>
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
    borderRadius: 8,
    color: '#333333',
    backgroundColor: '#F4F4F4',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },

  submitButton: {
    backgroundColor: '#7239d6',
    borderRadius: 18,
    alignItems: 'center',
    width: '80%',
    margin: 20,
    elevation: 7,
  },

  submitText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default Login;
