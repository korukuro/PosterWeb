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
  const [openStates, setOpenStates] = useState({}); // Object to track open states for each order group

  const handleToggle = (orderId) => {
    // Toggle the open state for the specific order group
    setOpenStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
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
    <div className="p-1 w-full h-full">
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
              className={`mb-6 pb-5 border relative border-black border-dashed bg-[#FAF9F6] rounded-lg lg:w-[50%] w-[70%] overflow-hidden transition-all duration-500 ${
                openStates[group.orderId] ? "max-h-[1000px]" : "max-h-[15.8rem]"
              }`}
            >
              <div className="flex gap-24 border-b border-black justify-between pl-2 pr-2">
                <div className="gap-3 items-center">
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
                  <li key={idx} className="p-1 border-b border-gray-200">
                    <div className="flex gap-10 justify-between pl-28 pr-20">
                      <div className="flex flex-col gap-2 mt-4">
                        <h3 className="text-lg underline underline-offset-1 ">
                          {order.poster?.posterName ||
                            "Poster Title Unavailable"}
                        </h3>
                        <p className="mt-4">
                          Price: ₹{order.poster?.price || "N/A"}
                        </p>
                        <p>Quantity: {order?.quantity || 0}</p>
                        <p>
                          {order?.delivered ? "Delivered" : "Delivery On Way"}
                        </p>
                        
                      </div>
                      {order.poster?.image ? (
                        <img
                          src={order.poster?.image}
                          alt={order.poster?.posterName}
                          width={120}
                          className="rounded-lg"
                        />
                      ) : (
                        <p>Image unavailable</p>
                      )}
                      {/* Badge for additional orders */}
                      {group.orders.length > 1 &&
                        !openStates[group.orderId] && (
                          <div className="absolute top-36 right-5 rounded-full w-8 p-1 bg-white text-black dark:bg-gray-700 dark:text-white">
                            +{group.orders.length - 1}
                          </div>
                        )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Dropdown Button */}
              {group.orders.length > 1 && (
                <div
                  onClick={() => handleToggle(group.orderId)}
                  className="cursor-pointer flex items-center justify-center w-[100%] border border-black bg-white text-black dark:bg-black dark:text-white mx-auto mt-2 absolute bottom-0"
                >
                  {openStates[group.orderId] ? <SlArrowUp /> : <SlArrowDown />}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
