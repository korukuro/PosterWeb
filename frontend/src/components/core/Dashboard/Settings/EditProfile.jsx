import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/settingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Other", "Prefer not to say"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="flex flex-col gap-y-2 lg:gap-y-7 lg:pt-2 pl-2 lg:pl-0">
          <h1 className="font-bold text-lg lg:text-xl pl-2 pt-2">Profile</h1>
          <div className="flex flex-col pl-2 lg:gap-2 lg:flex-row lg:pl-2">
            <div className="flex flex-col w-[85%] md:w-[70%] lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style font-semibold text-sm lg:text-base">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style text-sm lg:text-base rounded-sm h-7 lg:h-10 p-2 border border-black focus:outline-none bg-transparent"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col w-[85%] md:w-[70%] lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style font-semibold text-sm lg:text-base">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-style text-sm lg:text-base rounded-sm h-7 lg:h-10 p-2 border border-black focus:outline-none bg-transparent"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col pl-2 gap-2 lg:flex-row lg:pl-2">
            <div className="flex flex-col w-[85%] md:w-[70%] lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style font-semibold text-sm lg:text-base">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style text-sm lg:text-base rounded-sm h-7 lg:h-10 p-2 border border-black focus:outline-none bg-transparent"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-[85%] md:w-[70%] lg:w-[48%]">
              <label htmlFor="gender" className="lable-style font-semibold text-sm lg:text-base">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style text-sm lg:text-base rounded-sm h-7 lg:h-10 lg:p-2 border border-black focus:outline-none bg-transparent"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pr-3 gap-2 mt-5 mb-2 lg:mb-0">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer px-2 text-xs md:px-3 lg:px-3 lg:py-1 lg:text-base text-red-700 border border-red-700 hover:scale-105 transition-all duration-300"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  )
}
