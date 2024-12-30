import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../../font/font.css";

import { login } from "../../../services/operations/authAPI";
import googleLogo from "../../../additionalFile/google.png";
import facebookLogo from "../../../additionalFile/facebook.png";


function LoginForm() {
  const navigate = useNavigate(); //what is useNavigate? It is a hook that returns a navigate function that can be used to programmatically navigate to a different location.eg: navigate('/login')
  const dispatch = useDispatch(); //what is dispatch? It is a function that is used to dispatch actions to the Redux store.eg: dispatch(login(email, password, navigate))
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-10 flex w-full flex-col gap-y-4 rounded-[8px] ml-4 "
    >
      <label className="w-full top-[47.194rem] ">
        <p className="mb-1 text-[1.2rem] leading-[1.375rem] text-richblack-5 ">
          E-mail
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="form-style w-full bg-gray-300 rounded-lg text-gray-700 p-2 border-2 border-black"
        />
      </label>
      <label className="relative mt-4">
        <p className="mb-1 text-[1.2rem] leading-[1.375rem] text-richblack-5">
          PASSWORD
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="form-style w-full bg-gray-300 rounded-lg text-gray-700 p-2 border-2 border-black"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[35px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#111111" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#111111" />
          )}
        </span>
      </label>
      <div className="flex items-center justify-between w-full mt-6">
        <Link to="/forgot-password">
          <p className="text-base text-blue-700">forgot password?</p>
        </Link>

        <button
          type="submit"
          className="rounded-l-full rounded-r-full bg-black text-white py-[0.6rem] px-[0.90rem] font-bold"
        >
          LOGIN
        </button>
      </div>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-black"></div>
        <span className="mx-1 text-gray-700 font-semibold text-xl">or</span>
        <div className="flex-grow border-t border-black"></div>
      </div>
      <div className="flex items-center justify-evenly">
        <span>Login With</span>
        <div className="flex items-center">
          <img src={googleLogo} alt="google logo" width={18}/><span className="text-blue-700 ml-1 text-base">Google</span>
        </div>
        <div className="flex items-center">
          <img src={facebookLogo} alt="facebook logo" width={18}/><span className="text-blue-700 ml-1 text-base">facebook</span>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
