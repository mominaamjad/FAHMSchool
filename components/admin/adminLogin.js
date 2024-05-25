import Login from "../Login";
import React from "react";

const AdminLogin = ()=>{
    return (
        <Login imagePath={require('../assets/adminLogin.png')} role="Admin"></Login>
    )
}

export default AdminLogin;