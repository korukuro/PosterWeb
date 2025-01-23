import Template from "../components/core/auth/Template";
import React from "react";
import LoginSignupAndImg from "../components/common/LoginSignupAndImg";


function Login() {
  return (

    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <LoginSignupAndImg />
      </div>
        <Template
          title="Welcome Back!!"
          formType="login"
        />
      
    </div>
  );
}

export default Login;
