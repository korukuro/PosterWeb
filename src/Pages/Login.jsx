import Template from "../components/core/auth/Template";
import React from "react";
import LoginSignupAndImg from "../components/common/LoginSignupAndImg";

function Login() {
  return (

    <div className="h-screen grid grid-cols-3">
      <div className="col-span-2">
        <LoginSignupAndImg />
      </div>
      <div className="">
          {/* <img src={logo} alt="" className="ml-[35%]"/> */}
        <Template
          title="Welcome Back!!"
          formType="login"
        />
      </div>
    </div>
  );
}

export default Login;
