import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const oldPasswordValue = watch("oldPassword", "");
  const newPasswordValue = watch("newPassword", "");

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="flex flex-col gap-y-2 rounded-md pl-28">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-11 lg:flex-row">
            {/* Current Password */}
            <div className="relative flex flex-col gap-2 lg:w-[42%]">
              <label htmlFor="oldPassword" className="lable-style">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
                {...register("oldPassword", { required: true })}
              />
              {oldPasswordValue && (
                <span
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute right-[8rem] top-[2.4rem] z-[10] cursor-pointer"
                >
                  {showOldPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              )}
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="relative flex flex-col gap-2 lg:w-[42%]">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
                {...register("newPassword", { required: true })}
              />
              {newPasswordValue && (
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-[8rem] top-[2.4rem] z-[10] cursor-pointer"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              )}
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-5 pr-11">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer border border-red-600 py-2 px-5 text-red-600 hover:scale-105 transition-all duration-300"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  );
}
