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
        <div className="flex flex-col gap-y-2 pl-28">
          <div className="flex flex-col gap-11 lg:flex-row">
            <div className="flex flex-col lg:w-[42%]">
              <label htmlFor="firstName" className="lable-style font-semibold">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col lg:w-[42%]">
              <label htmlFor="lastName" className="lable-style font-semibold">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
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

          <div className="flex flex-col gap-11 lg:flex-row">
            <div className="flex flex-col lg:w-[42%]">
              <label htmlFor="dateOfBirth" className="lable-style font-semibold">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
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
            <div className="flex flex-col  lg:w-[42%]">
              <label htmlFor="gender" className="lable-style font-semibold">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
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

          <div className="flex flex-col lg:w-[87.5%]">
              <label htmlFor="about" className="lable-style font-semibold">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter Address Details"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
                {...register("address", { required: true })}
                defaultValue={user?.additionalDetails?.address}
              />
              {errors.address && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Address.
                </span>
              )}
            </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col lg:w-[87.5%]">
              <label htmlFor="contactNumber" className="lable-style font-semibold">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            
          </div>
          <div className="flex flex-col gap-11 lg:flex-row">
            <div className="flex flex-col lg:w-[42%]">
              <label htmlFor="City  " className="lable-style font-semibold">
                City
              </label>
              <input
                type="text"
                name="City"
                id="City"
                placeholder="Enter city"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
                {...register("City", { required: true })}
                defaultValue={user?.City}
              />
              {errors.City && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col lg:w-[42%]">
              <label htmlFor="State" className="lable-style font-semibold">
                State
              </label>
              <input
                type="text"
                name="State"
                id="State"
                placeholder="Enter state"
                className="form-style rounded-sm h-14 p-2 border border-black focus:outline-none bg-transparent"
                {...register("State", { required: true })}
                defaultValue={user?.State}
              />
              {errors.State && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pr-14 gap-2 mt-5">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer py-2 px-5 text-red-700 border border-red-700 hover:scale-105 transition-all duration-300"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  )
}
