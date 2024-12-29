import Template from "../components/core/auth/Template";

function Login() {
  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-[55%] border-black border-2 flex-shrink-0 background-black">
        <p>HEELo</p>
      </div>
      <div className="w-[45%] mx-auto border-black border-2 flex items-center justify-center flex-shrink-0">
        <img src="" alt="" />
        <Template
          title="Welcome Back"
          formType="login"
        />
      </div>
    </div>
  );
}

export default Login;
