import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { logout } from "../services/operations/authAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useState } from "react";
import OrderHistory from "../components/core/Dashboard/OrderHistory";

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
    <div className="h-screen flex">
      {/* <h1>Dashboard</h1> */}
      {/* <Link to="/dashboard/settings">Settings</Link> <br />
      <Link to="/dashboard/order-history">Order history</Link> <br />*/}
      {/* <button onClick={handleLogOut} className="absolute">Log Out</button>  */}
      {/* <Outlet /> */}
      <section className="w-[45%] mt-20 h-screen gap-3 pt-5 flex flex-col items-end">
        <div className="border border-red-600 h-[20rem] w-[30rem] rounded-lg"></div>
        <div className="border border-red-600 h-[18.5rem] w-[30rem] rounded-lg"></div>
      </section>
      <section className=" w-[55%] mt-20 h-screen pt-5 pl-2">
        <div className="border border-red-600 w-[47rem] h-[39.3rem] rounded-lg overflow:auto"><OrderHistory/></div>
      </section>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal}/>
      )}
    </div>
  )
}
export default Dashboard