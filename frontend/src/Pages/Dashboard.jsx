import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { logout } from "../services/operations/authAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useState } from "react";
import OrderHistory from "../components/core/Dashboard/OrderHistory";
import EditProfile from "../components/core/Dashboard/Settings/EditProfile";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleLogOut = () => {
      setConfirmationModal({
        text1: "Are you sure?",
        text2: "You will be logged out of your account.",
        btn1Text: "Logout",
        btn2Text: "Cancel",
        btn1Handler: () => dispatch(logout(navigate)),
        btn2Handler: () => setConfirmationModal(null),
      })
  }
  return (
    <div className="sm:h-auto lg:h-screen flex flex-col items-center lg:flex-row pb-1 sm:pb-2 lg:pt-20">
      {/* <h1>Dashboard</h1> */}
      {/* <Link to="/dashboard/settings">Settings</Link> <br />
      <Link to="/dashboard/order-history">Order history</Link> <br />*/}
      {/* <button onClick={handleLogOut} className="absolute">Log Out</button>  */}
      {/* <Outlet /> */}
      <section className="lg:w-[45%] mt-20 lg:h-screen gap-3 pt-5 flex flex-col lg:items-end w-[95%]">
        <div className="border border-dashed border-black sm:w-auto lg:h-[20rem] lg:w-[30rem] rounded-lg lg:shadow-md"><EditProfile/></div>
        <div className="border border-dashed border-black w-1/2 h-[20rem] lg:h-[18.5rem] lg:w-[30rem] rounded-lg lg:shadow-md"></div>
      </section>
      <section className="lg:w-[55%] mt-5 lg:mt-20 lg:h-screen lg:pt-5 lg:pl-2">
      <h1 className="border-b border-black mb-1 lg:hidden pl-3">Order History</h1>
        <div className=" h-[29.5rem] sm:w-screen sm:overflow-x-hidden lg:w-[47rem] lg:h-[39.3rem] rounded-lg overflow-auto scrollbar-hide lg:shadow-md"><OrderHistory/></div>
      </section>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal}/>
      )}
    </div>
  )
}
export default Dashboard