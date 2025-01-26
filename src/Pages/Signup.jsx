import LoginSignupAndImg from "../components/common/LoginSignupAndImg"
import Template from "../components/core/auth/Template"

function Signup() {
  return (
    <div className="h-screen grid grid-cols-3 md:grid-cols-3">
      <div className="col-span-2">
        <LoginSignupAndImg />
      </div>
      <Template
        title="Create an Account"
        formType="signup"
      />
    </div>
  )
}

export default Signup
