import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { logout } from "../services/operations/authAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useState } from "react";

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
    <div className="mt-24">
      <h1>Dashboard</h1>
      <Link to="/dashboard/settings">Settings</Link> <br />
      <Link to="/dashboard/order-history">Order history</Link> <br />
      <button onClick={handleLogOut}>Log Out</button>
      <Outlet />

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal}/>
      )}
    </div>
  )
}
export default Dashboard