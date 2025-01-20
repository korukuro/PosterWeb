import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../../services/operations/posterDetailsAPI";
import { useSelector } from "react-redux";
import Spinner from "../../Spinner";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    //handle toggle function works to toggle the order history
    setIsOpen((prevState) => !prevState);
  };

  const fetchOrders = async (token) => {
    try {
      setLoading(true);
      const response = await getOrderHistory(token);
      console.log("Order History Response: ", response);

      if (response?.orderHistory) {
        setOrders(response.orderHistory);
      } else {
        setOrders([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching order history:", err);
      setError("Failed to fetch order history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const groupOrdersByOrderId = (orders) => {
    const grouped = orders.reduce((acc, order) => {
      const { orderId } = order;
      if (!acc[orderId]) {
        acc[orderId] = {
          orders: [],
          totalPrice: 0,
          purchaseDate: order.purchasedOn,
        };
      }
      acc[orderId].orders.push(order);
      acc[orderId].totalPrice +=
        (order.poster?.price || 0) * (order.quantity || 0);
      return acc;
    }, {});

    return Object.entries(grouped).map(([orderId, group]) => ({
      orderId,
      ...group,
    }));
  };

  useEffect(() => {
    if (token) {
      fetchOrders(token);
    }
  }, [token]);

  const groupedOrders = groupOrdersByOrderId(orders);

  return (
    <div className="p-1 overflow-hidden w-full">
      <h2>Order History</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : groupedOrders.length === 0 ? (
        <p>
          No orders found. (If there are orders and not visible then try logging
          in again.)
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center ">
          {groupedOrders.map((group) => (
           <div
           key={group.orderId}
           className={`mb-6 border border-black rounded-lg w-[50%] overflow-clip transition-all duration-300 ${
             isOpen ? "h-auto" : "h-[39.5rem]"
           }`}
         >
           <div className="flex gap-24 border-b border-black justify-between pl-2 pr-2">
             <div className="flex gap-3 items-center">
               <h3 className="font-normal text-lg">Order ID:</h3>
               <p>{group.orderId}</p>
             </div>
             <div className="flex gap-10">
               <div className="flex flex-col items-center justify-center">
                 <h3 className="font-normal text-lg">Date Placed</h3>
                 <p>{new Date(group.purchaseDate).toLocaleDateString()}</p>
               </div>
               <div className="flex flex-col items-center justify-center">
                 <h3 className="font-normal text-lg">Total Amount</h3>
                 <p>₹{group.totalPrice}</p>
               </div>
             </div>
           </div>
           <ul className="relative">
             {group.orders.map((order, idx) => (
               <li key={idx} className="p-2">
                 <div className="flex gap-10">
                   {order.poster?.image ? (
                     <img
                       src={order.poster?.image}
                       alt={order.poster?.posterName}
                       width={180}
                     />
                   ) : (
                     <p>Image unavailable</p>
                   )}
                   <div>
                     <h3 className="text-lg">
                       {order.poster?.posterName || "Poster Title Unavailable"}
                     </h3>
                     <p>Price: ₹{order.poster?.price || "N/A"}</p>
                     <p>Quantity: {order?.quantity || 0}</p>
                     <p>{order?.delivered ? "Delivered" : "Delivery Pending"}</p>
                   </div>
                 </div>
               </li>
             ))}
             {group.orders.length > 2 && (
               <div
                 onClick={handleToggle}
                 className="cursor-pointer flex items-center justify-center absolute top-[35rem] left-1/2"
               >
                 {!isOpen ? (
                   <div className="flex items-center justify-center">
                     <SlArrowDown />
                   </div>
                 ) : (
                   <div className="flex items-center justify-center">
                     <SlArrowUp />
                   </div>
                 )}
               </div>
             )}
           </ul>
           {/* Dropdown Button */}
         </div>
         
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
