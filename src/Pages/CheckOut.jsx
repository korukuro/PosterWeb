import React from "react";
import { useSelector } from "react-redux";
import CheckOutItem from "../components/CheckOutItem";
const CheckOut = () => {
  const { cart } = useSelector((state) => state);
  return (
    <div className=" flex flex-col lg:flex-row w-full h-auto lg:h-[91.2vh] mx-auto overflow-x-hidden">
      <div className="lg:w-[50%] border-black w-full h-auto border-t-2 p-10 lg:pl-56 lg:pt-16">
        <h1 className="text-2xl mb-4">Delivery</h1>
        <form className="flex flex-col gap-y-4">
          <label>
            <input
              type="text"
              value="INDIA" readonly
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
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label>
              <input
                required
                type="text"
                placeholder="Last Name"
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
          </div>
          <label>
            <input
              required
              type="text"
              placeholder="Address"
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
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label>
              <input
                required
                type="text"
                placeholder="State"
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label>
              <input
                required
                type="text"
                placeholder="PIN Code"
                className="form-style w-full border border-black rounded-lg h-12 pl-2"
              />
            </label>
          </div>
          <label>
            <input
              required
              type="text"
              placeholder="Phone"
              className="form-style w-full border border-black rounded-lg h-12 pl-2"
            />
          </label>
          <div className="flex justify-between mt-4 text-sm">
            <span className="text-gray-500">Expected Delivery:</span>
            <span className="text-gray-500">3-4 days</span>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="rounded-lg bg-black py-3 px-6 font-medium text-white w-full sm:w-full"
            >
              PAY NOW
            </button>
          </div>
        </form>
      </div>

      <div className="lg:w-[50%] w-full h-auto border-t-2 border-l lg:border-t-2 border-black lg:pl-12 lg:pt-16 overflow-hidden">
        <div className="w-full lg:w-[35.5rem] space-y-6 overflow-hidden">
          <div className="flex space-x-4">
            <div className="flex flex-col h-[30rem] pr-5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-black scrollbar-track-gray-200 scrollbar-hide">
              {cart.map((item, index) => {
                return (
                  <CheckOutItem key={item.id} item={item} itemIndex={index} />
                );
              })}
            </div>
          </div>
          <div className="flex justify-between text-md text-gray-600">
            <span>Shipment:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>Price</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
