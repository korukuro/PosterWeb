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

  const fetchOrders = async (token) => {
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
      fetchOrders(token);
    }
  }, [token]);

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

  const handleToggle = (orderId) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
  };

  const handleRatingClick = (order) => {
    setSelectedOrder(order); // Store the selected order
    setRatingModal(true); // Open the modal
  };

  const handleModalClose = () => {
    setRatingModal(false); // Close the modal
    setSelectedOrder(null); // Reset selected order
  };

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
        <p>No orders found. (Try logging in again if there are orders.)</p>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {groupedOrders.map((group) => (
            <div
              key={group.orderId}
              className={`mb-6 pb-5 border border-black border-dashed bg-[#FAF9F6] rounded-lg lg:w-[50%] w-[70%] overflow-hidden transition-all duration-500 ${
                openStates[group.orderId] ? "max-h-[1000px]" : "max-h-[15.8rem]"
              }`}
            >
              <div className="flex gap-24 border-b border-black justify-between p-2">
                <div className="gap-3">
                  <h3 className="font-normal text-lg">Order ID:</h3>
                  <p>{group.orderId}</p>
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-col items-center">
                    <h3 className="font-normal text-lg">Date Placed</h3>
                    <p>{new Date(group.purchaseDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="font-normal text-lg">Total Amount</h3>
                    <p>₹{group.totalPrice}</p>
                  </div>
                </div>
              </div>
              <ul>
                {group.orders.map((order, idx) => (
                  <li key={idx} className="p-1 border-b border-gray-200">
                    <div className="flex justify-between pl-28 pr-20">
                      <div className="flex flex-col gap-2 mt-4">
                        <h3 className="text-lg underline">
                          {order.poster?.posterName || "Poster Title Unavailable"}
                        </h3>
                        <p>Price: ₹{order.poster?.price || "N/A"}</p>
                        <p>Quantity: {order.quantity || 0}</p>
                        <p>
                          {order?.delivered ? "Delivered" : "Delivery On Way"}
                        </p>
                        <button
                          className="rounded-full bg-black text-white px-4 py-2"
                          onClick={() =>
                            handleRatingClick(order)
                          }
                        >
                          Rate
                        </button>
                      </div>
                      {order.poster?.image ? (
                        <img
                          src={order.poster.image}
                          alt={order.poster.posterName}
                          width={120}
                          className="rounded-lg"
                        />
                      ) : (
                        <p>Image unavailable</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {group.orders.length > 1 && (
                <div
                  onClick={() => handleToggle(group.orderId)}
                  className="cursor-pointer flex items-center justify-center w-full bg-white border-t border-black py-2"
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
          order={selectedOrder}
          onClose={handleModalClose}
          setRatingModal={setRatingModal}
        />
      )}
    </div>
  );
};

export default OrderHistory;
