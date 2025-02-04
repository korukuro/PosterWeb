import OrderHistory from "../components/core/Dashboard/OrderHistory";
import EditProfile from "../components/core/Dashboard/Settings/EditProfile";
import UpdatePassword from "../components/core/Dashboard/Settings/UpdatePassword";

const Dashboard = () => {
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

      <h1 className="border-b border-black mb-1 lg:hidden pl-3">
        Order History
      </h1>
      <div className="h-[38rem] lg:pt-1 lg:pb-1 sm:w-screen sm:overflow-x-hidden lg:w-auto overflow-y-auto scrollbar-hide lg:border-t-2 lg:border-b-2 border-black">
        <OrderHistory />
      </div>
    </div>
  );
};
export default Dashboard;
