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

  const groupOrdersByDate = (orders) => {
    return orders.reduce((groups, order) => {
      const date = order?.purchasedOn
        ? new Date(order.purchasedOn).toLocaleDateString()
        : "Unknown Date";
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});
  };

  useEffect(() => {
    if (token) {
      fetchOrders(token); // Fetch orders if token exists
    }
  }, [token]); // Re-run if token changes

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="p-1 overflow-hidden w-full">
      <h2>Order History</h2>
      {/* Display loader */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        // Display error if any
        <p>{error}</p>
      ) : Object.keys(groupedOrders).length === 0 ? (
        // Handle no orders case
        <p>
          No orders found. (If there are orders and not visible then try login
          again)
        </p>
      ) : (
        // Display grouped order list
        <>
          {Object.entries(groupedOrders).map(([date, orders], index) => (
            <div key={index} className="mb-6 border-2 border-black">
              <div>

                <h3 className="text-lg font-semibold mb-4">{date}</h3>
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
                      <h3>
                        {order.poster?.posterName || "Poster Title Unavailable"}
                      </h3>
                    </div>
                    <p>Price: ₹{order.poster?.price || "N/A"}</p>
                    <p>Quantity: {order?.quantity || 0}</p>
                    <p>Total: ₹{order?.totalPrice || "N/A"}</p>
                    {/* <p>
                      Purchased On:{" "}
                      {order?.purchasedOn
                        ? new Date(order?.purchasedOn).toLocaleString()
                        : "Date Unavailable"}
                    </p> */}
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
