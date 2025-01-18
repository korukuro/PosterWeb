import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../../services/operations/posterDetailsAPI";
import { useSelector } from "react-redux";
import Spinner from "../../Spinner";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);

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

  const groupOrdersByExactTime = (orders) => {
    return orders.reduce((groups, order) => {
      const exactTime = order?.purchasedOn
        ? new Date(order.purchasedOn).toLocaleString() // Group by full date and time
        : "Unknown Time";
      if (!groups[exactTime]) {
        groups[exactTime] = [];
      }
      groups[exactTime].push(order);
      return groups;
    }, {});
  };

  useEffect(() => {
    if (token) {
      fetchOrders(token);
    }
  }, [token]);

  const groupedOrders = groupOrdersByExactTime(orders);

  return (
    <div className="p-1 overflow-hidden w-full">
      <h2>Order History</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : Object.keys(groupedOrders).length === 0 ? (
        <p>No orders found. (If there are orders and not visible then try login again)</p>
      ) : (
        <>
          {Object.entries(groupedOrders).map(([time, orders], index) => (
            <div key={index} className="mb-6 border-2 border-black">
              <div>
                <h3 className="text-lg font-semibold mb-4">{time}</h3>
              </div>
              <ul>
                {orders.map((order, idx) => (
                  <li key={idx} className="border-b border-black p-2">
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
                      <h3>{order.poster?.posterName || "Poster Title Unavailable"}</h3>
                    </div>
                    <p>Price: ₹{order.poster?.price || "N/A"}</p>
                    <p>Quantity: {order?.quantity || 0}</p>
                    <p>Total: ₹{order?.totalPrice || "N/A"}</p>
                    <p>Status: {order?.delivered ? "Delivered" : "Pending"}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderHistory;
