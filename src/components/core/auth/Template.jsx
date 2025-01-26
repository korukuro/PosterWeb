import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, formType }) {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="pt-16">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-y-12">
          <h1 className="text-[2.6rem] font-semibold leading-[2.375rem] text-black mr-8 text-center">
            {title}
          </h1>
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      )}
    </div>
  );
}

export default Template;
