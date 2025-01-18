import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../../services/operations/posterDetailsAPI";
import { useSelector } from "react-redux";
import Spinner from "../../Spinner";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { token } = useSelector((state) => state.auth); // Get token from Redux

  const fetchOrders = async (token) => {
    try {
      setLoading(true); // Start loading
      const response = await getOrderHistory(token); // Fetch data
      console.log("Order History Response: ", response);

      if (response?.orderHistory) {
        setOrders(response.orderHistory); // Update orders if data is present
      } else {
        setOrders([]); // Fallback for empty or undefined data
      }
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching order history:", err);
      setError("Failed to fetch order history. Please try again later."); // Set error message
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders(token); // Fetch orders if token exists
    }
  }, [token]); // Re-run if token changes

  return (
    <div className="p-1 border-2 border-black overflow-hidden w-full">
      <h2>Order History</h2>
      {/* Display loader */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        // Display error if any
        <p>{error}</p>
      ) : orders.length === 0 ? (
        // Handle no orders case
        <p>
          No orders found. (If there are orders and not visible then try login
          again)
        </p>
      ) : (
        // Display order list
        <>
          <div className="w-full border-b border-black h-20 flex justify-between items-center">
            <div className="flex gap-24">
              <h1>Order Number</h1>
              <h1>
                {" "}
                Purchased On
                {/* Purchased On:{
              {orders.map((order, index) => (
                <span key={index}>
                  {order?.purchasedOn
                    ? new Date(order?.purchasedOn).toLocaleString()
                    : "Date Unavailable"}
                  {index < orders.length - 1 && ", "}
                </span>
              ))} */}
              </h1>
              <h1>Date placed</h1>
              <h1>Total Amount</h1>
            </div>

            <div className="flex gap-3">
              <button className="border border-black rounded-lg h-10 px-2 flex items-center justify-center">
                View Order
              </button>
              <button className="border border-black rounded-lg h-10 px-2 flex items-center justify-center">
                View Order
              </button>
            </div>
          </div>
          <ul>
            {orders.map((order, index) => (
              <li key={index} className="border-b border-black p-2">
                
                <div className="flex gap-10">
                {order.poster?.image ? (
                  <img
                    src={order.poster?.image}
                    alt={order.poster?.posterName}
                    width={100}
                  />
                ) : (
                  <p>Image unavailable</p>
                )}
                <h3>
                  {order.poster?.posterName || "Poster Title Unavailable"}
                </h3>
                </div>
                <p>Price: ₹{order.poster?.price || "N/A"}</p>
                <p>Quantity: {order?.quantity || 0}</p>
                <p>Total: ₹{order?.totalPrice || "N/A"}</p>
                <p>
                  Purchased On:{" "}
                  {order?.purchasedOn
                    ? new Date(order?.purchasedOn).toLocaleString()
                    : "Date Unavailable"}
                </p>
                <p>Status: {order?.delivered ? "Delivered" : "Pending"}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
