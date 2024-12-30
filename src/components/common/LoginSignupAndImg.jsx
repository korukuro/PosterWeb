import React from 'react'
import leftImage from '../../additionalFile/collage2.jpg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Template from '../core/auth/Template';
const LoginSignupAndImg = () => {
    const { token } = useSelector((state) => state.auth || {});

    return (
      <div className="h-screen">
        {!token && (
          <>
            {/* Buttons Section */}
            <div className="flex flex-col items-center justify-center mt-8 absolute right-[40%] top-[23%]">
              <Link to="/login">
                <button className="bg-[#00000053] text-white pl-5 w-[7.5rem] h-[3.5rem] py-2 rounded-l-full text-md font-bold">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#00000053] text-white pl-5 py-2 w-[7.5rem] h-[3.5rem] rounded-l-full text-md font-bold">
                  Signup
                </button>
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
