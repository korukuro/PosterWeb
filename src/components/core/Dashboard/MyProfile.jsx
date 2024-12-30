import React from "react";

const MyProfile = () => {
  return (
    <div className="h-[37.188rem] w-full flex flex-col">
      {/* Heading at the top */}
      <div className="flex items-center justify-between p-2">
        
          <div><h1 className="text-xl font-bold">MY PROFILE</h1></div>
        
        <div>
          <img
            src="path-to-pic.jpg"
            alt="Profile Pic"
            className="h-16 w-16 rounded-full"
          />
        </div>
      </div>

      {/* Bordered section below */}
      <div className="flex-grow flex flex-col gap-y-8 mt-4 border-2 border-white w-full rounded-xl pl-5 pt-20">
        <p className="mb-1 text-[1.3rem] leading-[1.375rem] text-richblack-5">
          Name : //name
        </p>
        <p className="mb-1 text-[1.3rem] leading-[1.375rem] text-richblack-5">
          EMAIL : //Email
        </p>
        <p className="mb-1 text-[1.3rem] leading-[1.375rem] text-richblack-5">
          PHONE : //phone
        </p>
        <p className="mb-1 text-[1.3rem] leading-[1.375rem] text-richblack-5">
          ADDRESS : //address
        </p>
        <input
          type="text"
          className="h-32 w-2/3 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default MyProfile;
