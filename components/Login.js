import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    
} from 'react-native';

const Login = ({imagePath, role}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const checkEmail = () => {
        if (email.trim()==="")
            return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = emailRegex.test(email);
        return isValid;
    };

    const checkPassword = ()=>{
        if (password==="")
            return false;
        let isValid = password.length>6;
        return isValid;
    }

    return (<View style={styles.alignment}>
        <View style={styles.container}>
            <Image source={imagePath} style={styles.image} />
        </View>
        <Text style={styles.login}>Login as {role}</Text>
        <TextInput style={styles.input} placeholder='Enter your email address' placeholderTextColor={'#333333'} onChangeText={setEmail}></TextInput>
        <TextInput style={styles.input} placeholder='Enter your password' placeholderTextColor={'#333333'} onChangeText={setPassword} secureTextEntry></TextInput>
        <TouchableOpacity style={styles.submitButton} onPress={() => {} } disabled={!checkEmail()||!checkPassword()}><Text style={styles.submitText}>Log in</Text></TouchableOpacity>
        
    </View>
    )
}

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
        borderWidth: 1,
        borderRadius: 8,
        color: "#333333"
    },
    submitButton:{
        backgroundColor: '#7239d6',
        borderRadius: 18,
        alignItems: 'center',
        width: '80%', 
        margin:20,
        elevation: 7,
    },
    submitText:{
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color:'#ffffff',
        paddingTop: 7,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
    },
});

export default Login;
