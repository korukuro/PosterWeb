import React from "react";
import leftImage from "../../additionalFile/collage2.jpg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginSignupAndImg = () => {
  const { token } = useSelector((state) => state.auth || {});
  const location = useLocation();

  const vistcheck = location.pathname === "/login" ? "Login" : "Signup";

  return (
    <div className="relative">
      {!token && (
        <div className="relative w-full h-screen">
          {/* Background Image */}
          <img
            src={leftImage}
            alt="Collage"
            className="w-full h-full object-cover"
          />

          {/* Buttons Overlay */}
          <div className="absolute top-1/4 right-0 flex flex-col gap-4 justify-center items-start pl-8">
            {/* Login Button */}
            <Link to="/login">
              <button
                className={`${
                  vistcheck === "Login" ? "bg-[#0000008e]" : "bg-[#0000004d]"
                } text-white px-5 w-[8rem] h-[3.5rem] rounded-l-full text-md font-bold hover:scale-105 transition-transform`}
              >
                Login
              </button>
            </Link>

            {/* Signup Button */}
            <Link to="/signup">
              <button
                className={`${
                  vistcheck === "Signup" ? "bg-[#0000008e]" : "bg-[#0000004d]"
                } text-white px-5 w-[8rem] h-[3.5rem] rounded-l-full text-md font-bold hover:scale-105 transition-transform`}
              >
                Signup
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignupAndImg;
