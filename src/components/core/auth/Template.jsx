import { useSelector } from "react-redux";
// import {GoogleLogin} from '@react-oauth/google';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
// import { useDispatch } from "react-redux"
// import { googleSignIn } from "../../../services/operations/authAPI"

function Template({ title, formType }) {
  const { loading } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const handleGoogleLogin = (credentialResponse) => {
  //   const { credential } = credentialResponse;
  //   // Dispatch action to send the Google token to your backend for verification
  //   dispatch(googleSignIn(credential));
  // };

  return (
    <div className="pt-24">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex gap-y-12 py-12 md:flex-col md:gap-y-0 md:gap-x-12 justify-center items-center">
          <h1 className="text-[2.875rem] font-semibold leading-[2.375rem] text-black mb-12 mr-8">
            {title}
          </h1>
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      )}
    </div>
  );
}

export default Template;
