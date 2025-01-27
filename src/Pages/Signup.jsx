import LoginSignupAndImg from "../components/common/LoginSignupAndImg"
import Template from "../components/core/auth/Template"

function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative">
      {/* LoginSignupAndImg Component */}
      <div className="col-span-2">
        <LoginSignupAndImg />
        {/* Template Overlay for Mobile Screens */}
      <div className="absolute top-40 left-0 right-0  flex items-center justify-center md:hidden ">
        <div className="bg-white rounded-2xl shadow-xl p-2 w-11/12 max-w-md">
        <Template title="Create an Account" formType="signup" />
        </div>
      </div>
      </div>
      {/* Template Component for Large Screens */}
      <div className="hidden md:block">
        <Template title="Create an Account" formType="signup" />
      </div>

      
    </div>
  )
}

export default Signup
