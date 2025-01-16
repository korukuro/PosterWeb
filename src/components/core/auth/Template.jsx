import { useSelector } from "react-redux"
// import {GoogleLogin} from '@react-oauth/google';
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
// import { useDispatch } from "react-redux"
// import { googleSignIn } from "../../../services/operations/authAPI"

function Template({ title, formType }) {
  const { loading } = useSelector((state) => state.auth)
  // const dispatch = useDispatch();

  // const handleGoogleLogin = (credentialResponse) => {
  //   const { credential } = credentialResponse;
  //   // Dispatch action to send the Google token to your backend for verification
  //   dispatch(googleSignIn(credential));
  // };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[2.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
{/* 
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}
        </div>
      )}
    </div>
  )
}

export default Template
