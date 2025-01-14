import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../../services/operations/posterDetailsAPI";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const fetchOrders = async (token) => {
    try {
      const response = await getOrderHistory(token);
      console.log("Order History Response: ", response);
      
      // Safeguard against undefined or invalid response
      if (response && Array.isArray(response.orderHistory)) {
        setOrders(response.orderHistory);
      } else {
        console.warn("Invalid response format: ", response);
        setOrders([]); // Default to an empty array
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      setOrders([]); // Default to an empty array in case of error
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders(token);
    }
  }, [token]);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h3>{order.poster?.title || "Untitled Poster"}</h3>
              <img
                src={order.poster?.image || "/placeholder.png"}
                alt={order.poster?.title || "No Image"}
                width={100}
              />
              <p>Price: ₹{order.poster?.price || "N/A"}</p>
              <p>Quantity: {order.quantity || 0}</p>
              <p>Total: ₹{order.totalPrice || "N/A"}</p>
              <p>Purchased On: {order.purchasedOn ? new Date(order.purchasedOn).toLocaleString() : "Unknown"}</p>
              <p>Status: {order.delivered ? "Delivered" : "Pending"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
