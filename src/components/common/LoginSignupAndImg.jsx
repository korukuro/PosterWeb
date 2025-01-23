import React from "react";
import leftImage from "../../additionalFile/collage2.jpg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const LoginSignupAndImg = () => {
  const { token } = useSelector((state) => state.auth || {});
  const location = useLocation();

  const vistcheck = location.pathname === "/login" ? "Login" : "Signup";
  return (
    <div>
      {!token && (
        <>
          <div className="relative border-2 border-black">
            <img src={leftImage} alt=""/>
            <div className="flex flex-col gap-4 right-0 border-2 border-black absolute">
              <Link to="/login">
                {vistcheck === "Login" ? (
                  <button className="bg-[#0000008e] text-white pl-5 w-[7.5rem] h-[3.5rem] rounded-l-full text-md font-bold">
                    Login
                  </button>
                ) : (
                  <button className="text-white pl-5 w-[7.5rem] h-[3.5rem] rounded-l-full text-md font-bold">
                    Login
                  </button>
                )}
              </Link>
              <Link to="/signup">
                {vistcheck === "Signup" ? (
                  <button className="bg-[#0000008e] text-white pl-5 py-2 w-[7.5rem] h-[3.5rem] rounded-l-full text-md font-bold">
                    Signup
                  </button>
                ) : (
                  <button className=" text-white pl-5 py-2 w-[7.5rem] h-[3.5rem] rounded-l-full text-md font-bold">
                    Signup
                  </button>
                )}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginSignupAndImg;
