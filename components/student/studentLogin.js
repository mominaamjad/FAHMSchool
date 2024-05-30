import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,

} from 'react-native';

import { loginStudent } from '../../api/student';


const Login = ( {navigation} ) => {
    const [regNo, setReg] = useState("")
    const [password, setPassword] = useState("")

    const [regError, setRegError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = async () => {
        try {
          const student = await loginStudent({
            regNo: regNo,
            password: password,
          });
          console.log(
            'Login Successful',
            `Welcome ${student.regNo.studentName} ${student.regNo.fatherName}`,
          );

          console.log(student.regNo.regNo)

          navigation.navigate('StudentMainScreen', student.regNo.regNo)  
        
        } catch (error) {
          console.log('Login Failed', error.message);
          setLoginError('Login failed. Please try again!');
        }
      };

    const checkReg = () => {
        if (regNo.trim()===""){
            setRegError('Registration no. is required');
            return false;

        }

        const regRegex = /^\d{4}-\d{3}$/;

        // const regRegex = /^[0-9]{4}-\[0-9]{3}$/

        let isValid = regRegex.test(regNo.trim());
        if (!isValid) {
            setRegError('Invalid registration no. format');
            return false;
        } else {
            setRegError('');
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
            <Image source={require('../assets/studentLogin.png')} style={styles.image} />
        </View>
        <Text style={styles.login}>Welcome!</Text>
        <TextInput 
            style={styles.input} 
            placeholder='Registration no.' 
            placeholderTextColor={'#333333'} 
            onChangeText={text => setReg(text)}
            onBlur={checkReg}>

        </TextInput>
        {regError ? <Text style={styles.errorText}>{regError}</Text> : null}

        <TextInput style={styles.input} 
            placeholder='Password' 
            placeholderTextColor={'#333333'} 
            onChangeText={text => setPassword(text)} 
            secureTextEntry
            onBlur={checkPassword}>

        </TextInput>
        
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity style={styles.submitButton} 
           onPress={handleLogin}>
            <Text style={styles.submitText}>Log in</Text>
        </TouchableOpacity>

        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        
    </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 250,
    },
    login: {
        fontFamily: 'Poppins-SemiBold',
        color: 'black',
        fontSize: 30,
        padding: 20,
    },
    alignment: {
        backgroundColor: "#ffffff",
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

    submitText:{
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#ffffff',
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
          }
});

export default Login;
