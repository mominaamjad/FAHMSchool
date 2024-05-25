import Login from "../Login";
import React from "react";

const teacherLogin = ()=>{
    return (
        <Login imagePath={require('../assets/teacherLogin.png')} role="Teacher"></Login>
    )
}

export default teacherLogin;