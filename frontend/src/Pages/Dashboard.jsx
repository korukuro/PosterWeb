import { useNavigate } from "react-router-dom";
import OrderHistory from "../components/core/Dashboard/OrderHistory";
import EditProfile from "../components/core/Dashboard/Settings/EditProfile";
import UpdatePassword from "../components/core/Dashboard/Settings/UpdatePassword";
import { MdOutlineLogout } from "react-icons/md";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../services/operations/authAPI";

const Dashboard = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => {
        dispatch(logout(navigate));
        setConfirmationModal(null);
      },
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="">
      <button 
        onClick={handleLogout} 
        className="absolute rounded-full bg-red-500 p-2 right-5 top-24 text-3xl text-white hover:scale-[1.1] z-50">
        <MdOutlineLogout />
      </button>

      <div className="sm:h-auto lg:mt-10 mt-16 flex flex-col items-center lg:gap-2 lg:flex-row pb-1 sm:pb-2 relative lg:min-h-screen pt-24 lg:pt-28 grid-col">


        <section className="lg:w-[50%] gap-3 flex flex-col lg:items-end w-[95%]">
          <div className="border border-dashed border-black flex justify-center items-center lg:h-[70%] lg:w-[90%] rounded-lg lg:shadow-md">
            <EditProfile />
          </div>
          <div className="border border-dashed border-black flex justify-center items-center lg:h-[70%] lg:w-[90%] rounded-lg lg:shadow-md">
            <UpdatePassword />
          </div>
        </section>


        <h1 className="border-b border-black mb-1 lg:hidden pl-3">
          Order History
        </h1>
        <div className="h-[38rem] lg:pt-1 lg:pb-1 sm:w-screen sm:overflow-x-hidden lg:w-auto overflow-y-auto scrollbar-hide lg:border-t-2 lg:border-b-2 border-black">
          <OrderHistory />
        </div>
      </div>
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>

  );

};
export default Dashboard;
