import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckOutItem from "../components/CheckOutItem";
import { BuyPoster } from "../services/operations/paymentAPI";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  useEffect(() => {
    // Calculate the total amount considering quantities
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cart]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    // Validate delivery details
    const isValid = Object.values(deliveryDetails).every(
      (value) => value.trim() !== ""
    );
    if (!isValid) {
      alert("Please fill out all delivery details.");
      return;
    }

    // Prepare poster details from cart
    const posterDetails = cart.map((item) => ({
      posterId: item._id,
      quantity: item.quantity,
    }));

    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    try {
      await BuyPoster(
        token,
        posterDetails,
        userDetails,
        deliveryDetails,
        navigate,
        dispatch
      );
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[91.2vh] mx-auto overflow-x-hidden">
      {/* Delivery Details Section */}
      <div className="lg:w-[50%] border-black w-full h-auto border-t-2 p-10 lg:pl-56 lg:pt-16">
        <h1 className="text-2xl mb-4">Delivery</h1>
        <form className="flex flex-col gap-y-4">
          <label>
            <input
              type="text"
              value="INDIA"
              readOnly
              className="w-full lg:w-80 h-12 px-2 border border-black rounded"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label>
              <input
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                value={deliveryDetails.firstName}
                onChange={handleInputChange}
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label>
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={deliveryDetails.lastName}
                onChange={handleInputChange}
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
          </div>
          <label>
            <input
              required
              type="text"
              name="address"
              placeholder="Address"
              value={deliveryDetails.address}
              onChange={handleInputChange}
              className="form-style w-full border border-black rounded-lg h-12 pl-2"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label>
              <input
                required
                type="text"
                name="city"
                placeholder="City"
                value={deliveryDetails.city}
                onChange={handleInputChange}
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label>
              <input
                required
                type="text"
                name="state"
                placeholder="State"
                value={deliveryDetails.state}
                onChange={handleInputChange}
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label>
              <input
                required
                type="text"
                name="pinCode"
                placeholder="PIN Code"
                value={deliveryDetails.pinCode}
                onChange={handleInputChange}
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
          </div>
          <label>
            <input
              required
              type="text"
              name="phone"
              placeholder="Phone"
              value={deliveryDetails.phone}
              onChange={handleInputChange}
              className="form-style w-full border border-black rounded-lg h-12 pl-2"
            />
          </label>
          <div className="flex justify-between mt-4 text-sm">
            <span className="text-gray-500">Expected Delivery:</span>
            <span className="text-gray-500">3-4 days</span>
          </div>
        </form>
        <div className="mt-5">
          <button
            onClick={handlePayment}
            className="rounded-lg bg-black py-3 px-6 font-medium text-white w-full sm:w-full"
          >
            PAY NOW
          </button>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="lg:w-[50%] w-full h-auto border-t-2 border-l lg:border-t-2 border-black lg:pl-12 lg:pt-16 overflow-hidden">
        <div className="w-full lg:w-[35.5rem] space-y-6 overflow-hidden">
          <div className="flex space-x-4">
            <div className="flex flex-col h-[30rem] pr-5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-black scrollbar-track-gray-200 scrollbar-hide">
              {cart.map((item, index) => (
                <CheckOutItem key={item._id} item={item} itemIndex={index} />
              ))}
            </div>
          </div>
          <div className="flex justify-between text-md text-gray-600">
            <span>Shipment:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
