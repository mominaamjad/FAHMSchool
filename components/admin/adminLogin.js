import Login from "../Login";
import React from "react";

const adminLogin = ()=>{
    return (
        <Login imagePath={require('../assets/adminLogin.png')} role="Admin"></Login>
    )
}

export default adminLogin;