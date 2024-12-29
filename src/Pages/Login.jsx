import Template from "../components/core/auth/Template";
import logo from "../additionalFile/logo.png";
import React from "react";


function Login() {
  return (

    <div className="h-screen flex overflow-hidden">
      <div className="w-[55%] border-black border-2 flex-shrink-0 ">
        <p>HEELo</p>
      </div>
      <div className="w-[45%] mx-auto border-black border-2 relative">
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
