import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    Button,
    View,
    Alert,
} from 'react-native';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (<View style={styles.alignment}>
        <View style={styles.container}>
            <Image source={require('./assets/adminLogin.png')} style={styles.logo} />
        </View>
        <Text style={styles.login}>Welcome Back!</Text>
        <Text>Email</Text>
        <TextInput style={styles.input} placeholder='Enter email' onChangeText={setEmail}></TextInput>
        <Text>Password</Text>
        <TextInput style={styles.input} placeholder='Enter password' onChangeText={setPassword} secureTextEntry></TextInput>
        <Button title='Submit' onPress={() => { }} disabled={email === '' || password === ''}></Button>
        <Text>No account?{' '}<Text style={styles.signup} onPress={() => alert('signup')}>Sign Up</Text>{' '}here</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
    },
    login: {
        // fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30,
        padding: 20,
    },
    alignment: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        width: '75%', 
        borderWidth: 1,
        borderRadius: 15,

    },
    signup: {
        color: 'cyan',
        fontWeight: 'bold',

    }
});

export default Login;
