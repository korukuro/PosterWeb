import React from 'react'
import leftImage from '../../additionalFile/collage2.jpg'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Template from '../core/auth/Template';
const LoginSignupAndImg = () => {
    const { token } = useSelector((state) => state.auth || {});
    const location = useLocation();

    const vistcheck = location.pathname === "/login" ? "Login" : "Signup";
    return (
      <div className="h-screen">
        {!token && (
          <>
            {/* Buttons Section */}
            <div className="flex flex-col gap-4 items-center justify-center mt-8 right-[34.5%] top-[23%] fixed ">
              <Link to="/login">
              {
                vistcheck === "Login" ? (
                  <button className="bg-[#0000008e] text-white pl-5 w-[7.5rem] h-[3.5rem] py-2 rounded-l-full text-md font-bold">
                    Login
                  </button>
                ) : (
                  <button className="text-white pl-5 w-[7.5rem] h-[3.5rem] py-2 rounded-l-full text-md font-bold">
                    Login
                  </button>
                )
              }
              </Link>
              <Link to="/signup">
              {
                vistcheck === "Signup" ? (
                  <button className="bg-[#0000008e] text-white pl-5 py-2 w-[7.5rem] h-[3.5rem] rounded-l-full text-md font-bold">
                    Signup
                  </button>
                ) : (
                  <button className=" text-white pl-5 py-2 w-[7.5rem] h-[3.5rem] rounded-l-full text-md font-bold">
                    Signup
                  </button>
                )
              }
              </Link>
            </div>
  
            {/* Main Sections */}
            <div className="flex h-[100%]">
              <div className="">
                <img src={leftImage} alt="" className="object-full h-screen" />
              </div>
              
            </div>
          </>
        )}
      </div>
    );
  };

export default LoginSignupAndImg
