import React from "react";
import { useSelector } from "react-redux";
import {usericon} from "../../../additionalFile/user.png";
const MyProfile = () => {
  const {user} = useSelector(state => state.profile);
  // console.log("user: ",user);
  return (
    <div className="h-[37.188rem] w-full flex flex-col">
      {/* Heading at the top */}
      <div className="flex items-center justify-between p-2">
        
          <div><h1 className="text-xl font-bold">MY PROFILE</h1></div>
        
        <div>
          <img
            src={user.image}
            alt="Profile Pic"
            className="h-16 w-16 rounded-full"
          />
        </div>
      </div>

      {/* Bordered section below */}
      <div className="flex-grow flex flex-col gap-y-8 mt-4 border-2 border-white w-full rounded-xl pl-5 pt-20">
        <p className="mb-1 text-[1.3rem] leading-[1.375rem] text-richblack-5">
          Name : <span>{user.firstName} {user.lastName}</span>
        </p>
        <p className="mb-1 text-[1.3rem] leading-[1.375rem] text-richblack-5">
          EMAIL : <span>{user.email}</span>
        </p>
        <p className="mb-1 text-[1.3rem] leading-[1.375rem] text-richblack-5">
          PHONE : <span>{user.additionalDetails.contactNumber}</span>
        </p>
        <p className="mb-1 text-[1.3rem] leading-[1.375rem] text-richblack-5">
          ADDRESS : <span>{user.additionalDetails.address}</span>
        </p>
        
      </div>
    </div>
  );
};

export default MyProfile;
