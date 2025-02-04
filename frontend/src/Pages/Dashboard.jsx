import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useState } from "react";
import OrderHistory from "../components/core/Dashboard/OrderHistory";
import EditProfile from "../components/core/Dashboard/Settings/EditProfile";
import UpdatePassword from "../components/core/Dashboard/Settings/UpdatePassword";

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
    });
  };
  return (
    <div className="sm:h-auto flex flex-col items-center lg:gap-2 lg:flex-row pb-1 sm:pb-2 relative lg:min-h-screen pt-24 lg:pt-28 grid-col">
      <section className="lg:w-[50%] gap-3 flex flex-col lg:items-end w-[95%]">
        <div className="border border-dashed border-black flex justify-center items-center lg:h-[70%] lg:w-[90%] rounded-lg lg:shadow-md">
          <EditProfile />
        </div>
        <div className="border border-dashed border-black flex justify-center items-center lg:h-[70%] lg:w-[90%] rounded-lg lg:shadow-md">
          <UpdatePassword />
        </div>
      </section>

      {/* <button onClick={handleLogOut} className="absolute">
        Log Out
      </button> */}
      <h1 className="border-b border-black mb-1 lg:hidden pl-3 mt-5">
        Order History
      </h1>
      <div className=" h-[29.5rem] sm:w-screen sm:overflow-x-hidden lg:w-auto lg:h-[] mb-2 sm:mb-2 md:mb-0 lg:mb-0 rounded-lg overflow-auto scrollbar-hide">
        <OrderHistory />
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};
export default Dashboard;
