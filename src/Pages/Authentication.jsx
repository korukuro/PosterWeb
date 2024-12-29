import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Authentication = () => {
  const { token } = useSelector((state) => state.auth || {});

  return (
    <div>
      {!token && (
        <>
          {/* Buttons Section */}
          <div className="flex flex-col items-center justify-center  mt-8 absolute left-[47%] top-[23%]">
            <Link to="/login">
              <button className="bg-[#000000] text-white pl-5 w-[7.5rem] h-[3.5rem] py-2 rounded-l-full text-md font-bold">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-[#000000] text-white pl-5 py-2 w-[7.5rem] h-[3.5rem] rounded-l-full text-md font-bold">
                Signup
              </button>
            </Link>
          </div>

          {/* Main Sections */}
          <div className="h-screen flex overflow-hidden">
            <div className="w-[55%] border-black border-2 flex-shrink-0">
              <p>HEELo</p>
            </div>
            <div className="w-[45%] mx-auto border-black border-2 relative">
              {/* <img src={logo} alt="" className="ml-[35%]"/> */}

              {/* <Template
          title="Welcome Back!!"
          formType="login"
        /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Authentication;
