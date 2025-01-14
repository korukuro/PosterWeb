import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../../services/operations/posterDetailsAPI";
import { useSelector } from "react-redux";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const {token} = useSelector(state => state.auth);

  const fetchOrders = async (token) => {
    try {
      const response = await getOrderHistory(token);
      console.log("Order History Response: ", response);
      setOrders(response.orderHistory);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchOrders(token);
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h3>{order.poster.title}</h3>
              <img src={order.poster.image} alt={order.poster.title} width={100} />
              <p>Price: ₹{order.poster.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: ₹{order.totalPrice}</p>
              <p>Purchased On: {new Date(order.purchasedOn).toLocaleString()}</p>
              <p>Status: {order.delivered ? "Delivered" : "Pending"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
