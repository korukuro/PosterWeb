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

  const groupOrdersByTimeThreshold = (orders, thresholdInSeconds = 10) => {
    // Sort orders by purchase time (most recent first)
    const sortedOrders = orders.sort((a, b) =>
      new Date(b.purchasedOn) - new Date(a.purchasedOn)
    );
  
    // Group orders by time threshold
    const groups = [];
    let currentGroup = { orders: [], totalPrice: 0 };
  
    sortedOrders.forEach((order, index) => {
      const orderTime = new Date(order.purchasedOn).getTime();
      const lastOrderTime = currentGroup.orders.length
        ? new Date(currentGroup.orders[currentGroup.orders.length - 1].purchasedOn).getTime()
        : null;
  
      if (
        lastOrderTime &&
        Math.abs(orderTime - lastOrderTime) <= thresholdInSeconds * 1000
      ) {
        // Add to the current group if within the threshold
        currentGroup.orders.push(order);
        currentGroup.totalPrice += order.totalPrice || 0;
      } else {
        // Save the current group and start a new one
        if (currentGroup.orders.length) {
          groups.push(currentGroup);
        }
        currentGroup = {
          orders: [order],
          totalPrice: order.totalPrice || 0,
        };
      }
    });
  
    // Push the last group if not empty
    if (currentGroup.orders.length) {
      groups.push(currentGroup);
    }
  
    return groups;
  };
  

  useEffect(() => {
    if (token) {
      fetchOrders(token);
    }
  }, [token]);

  const groupedOrders = groupOrdersByTimeThreshold(orders);

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
        <p>No orders found. (If there are orders and not visible then try login again)</p>
      ) : (
        <>
          {groupedOrders.map((group, index) => (
            <div key={index} className="mb-6 border-2 border-black p-4">
              <div className="flex gap-4">
                <div className="">
                  <h3>Date placed</h3>
                  <p className="text-lg font-semibold">
                    {new Date(group.orders[0].purchasedOn).toLocaleDateString()}
                  </p>
                </div>
                <div className="">
                  <h3>Total Amount</h3>
                  <p className="font-bold"> ₹{group.totalPrice}</p>
                </div>
              </div>
              <ul>
                {group.orders.map((order, idx) => (
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
                    <p>{order?.delivered ? "Delivered" : "Delivery Pending"}</p>
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
