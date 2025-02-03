import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../../services/operations/posterDetailsAPI";
import { useSelector } from "react-redux";
import Spinner from "../../Spinner";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import PosterRatingModal from "../PosterRatingModal";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [openStates, setOpenStates] = useState({});
  const [ratingModal, setRatingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrderHistory(token);
      if (response?.orderHistory) {
        setOrders(response.orderHistory);
      } else {
        setOrders([]);
      }
      setError(null);
    } catch (err) {
      setError("Failed to fetch order history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Group orders by orderId
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

  // Handle expanding/collapsing grouped orders
  const handleToggle = (orderId) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
  };

  // Open the rating modal
  const handleRatingClick = (order) => {
    setSelectedOrder(order); // Set the poster ID
    setRatingModal(true); // Open the modal
  };

  const groupedOrders = groupOrdersByOrderId(orders);

  return (
    <div className="p-1 w-[28rem] lg:w-full">
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : groupedOrders.length === 0 ? (
        <p>No orders found. (Try logging in again if there are orders.)</p>
      ) : (
        <div className="flex flex-col justify-center md:pl-96 lg:pl-0 items-center">
          {groupedOrders.map((group) => (
            <div
              key={group.orderId}
              className={`mb-6 pb-5 border relative border-black border-dashed bg-[#FAF9F6] rounded-lg w-[100%] md:w-auto overflow-hidden transition-all duration-500 ${
                openStates[group.orderId]
                  ? "max-h-[1000px]"
                  : "h-[14rem] sm:h-[18.5rem] md:h-[14.5rem] lg:h-[15.8rem]"
              }`}
            >
              <div className="flex gap-5 sm:gap-3 md:gap-36 lg:gap-24 border-b border-black justify-between pl-2 pr-1 lg:pr-2">
                <div className="gap-3 items-center">
                  <h3 className="font-normal lg:text-lg">Order ID:</h3>
                  <p className="text-sm lg:text-base">{group.orderId}</p>
                </div>
                <div className="flex gap-4 md:gap-14 lg:gap-10">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="font-normal lg:text-lg">Date Placed</h3>
                    <p className="text-sm lg:text-base">
                      {new Date(group.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="font-normal lg:text-lg">Total Amount</h3>
                    <p className="text-sm lg:text-base">₹{group.totalPrice}</p>
                  </div>
                </div>
              </div>
              <ul className="relative">
                {group.orders.map((order, idx) => (
                  <li
                    key={idx}
                    className="relative p-1 border-b border-gray-200 lg:h-48 lg:pt-5"
                  >
                    <div className="flex lg:gap-10 justify-between pl-2 lg:pl-28 pr-10 lg:pr-20">
                      <div className="flex flex-col gap-2 lg:mt-2">
                        <h3 className=" text-base lg:text-sm underline underline-offset-1 text-wrap lg:mb-2">
                          {order.poster?.posterName ||
                            "Poster Title Unavailable"}
                        </h3>
                        <p className="text-sm lg:text-sm text-gray-800">
                          Price: ₹{order.poster?.price || "N/A"}
                        </p>
                        <p className="text-sm lg:text-sm text-gray-800">
                          Quantity: {order?.quantity || 0}
                        </p>

                        <button
                          className="rounded-r-full rounded-l-full bg-black text-white w-20 lg:mt-2 lg:text-sm"
                          onClick={() => handleRatingClick(order)}
                        >
                          Rate
                        </button>
                      </div>
                      {order.poster?.image ? (
                        <img
                          src={order.poster?.image}
                          alt={order.poster?.posterName}
                          width={120}
                          className="rounded-lg lg:w-[100px] lg:h-[8rem] w-[100px] h-[150px]"
                        />
                      ) : (
                        <p>Image unavailable</p>
                      )}
                      {/* Badge for additional orders */}
                      {group.orders.length > 1 &&
                        !openStates[group.orderId] && (
                          <div className="absolute top-32 lg:top-36 right-5 rounded-full w-8 p-1 bg-white text-black dark:bg-gray-700 dark:text-white">
                            +{group.orders.length - 1}
                          </div>
                        )}
                    </div>
                    <p
                      className={`text-sm lg:text-xs absolute ${
                        group.orders?.length > 1 ? "bottom-4" : "bottom-0"
                      } left-5 ${
                        order?.delivered
                          ? "text-green-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }`}
                    >
                      {order?.delivered ? "Delivered" : "Delivery On Way"}
                    </p>
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
      {ratingModal && (
        <PosterRatingModal
          setRatingModal={setRatingModal}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default OrderHistory;
