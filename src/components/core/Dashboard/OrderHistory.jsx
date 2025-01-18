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
      acc[orderId].totalPrice += (order.poster?.price || 0) * (order.quantity || 0);
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
        <p>No orders found. (If there are orders and not visible then try login again)</p>
      ) : (
        <div>
          {groupedOrders.map((group) => (
            <div key={group.orderId} className="mb-6 border-2 border-black p-4">
              <div className="flex gap-4">
                <div>
                  <h3>Order ID</h3>
                  <p className="text-lg font-semibold">{group.orderId}</p>
                </div>
                <div>
                  <h3>Date Placed</h3>
                  <p className="text-lg font-semibold">
                    {new Date(group.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
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
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
