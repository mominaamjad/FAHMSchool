import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,

} from 'react-native';

const Login = () => {
    const [reg, setReg] = useState("")
    const [password, setPassword] = useState("")

    const checkReg = () => {
        if (reg.trim() === "")
            return false;
        // TODO: figure out format of reg numbers and form regex
        // const regRegex = /^$/;
        // let isValid = regRegex.test(reg);
        // return isValid;
        return true;
    };

    const checkPassword = () => {
        if (password === "")
            return false;
        let isValid = password.length > 6;
        return isValid;
    }

    return (<View style={styles.alignment}>
        <View style={styles.container}>
            <Image source={require('../assets/studentLogin.png')} style={styles.image} />
        </View>
        <Text style={styles.login}>Welcome!</Text>
        <TextInput style={styles.input} placeholder='Enter your registration no.' placeholderTextColor={'#333333'} onChangeText={setReg}></TextInput>
        <TextInput style={styles.input} placeholder='Enter your password' placeholderTextColor={'#333333'} onChangeText={setPassword} secureTextEntry></TextInput>
        <TouchableOpacity style={styles.submitButton} onPress={() => { }} disabled={!checkReg() || !checkPassword()}><Text style={styles.submitText}>Log in</Text></TouchableOpacity>

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
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#ffffff',
        paddingTop: 7,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default Login;
