import React from "react";

const CheckOut = () => {
  return (
    <div className="h-[91.2vh] flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="lg:w-[50%] w-full h-auto border-t-2 border-r border-black p-10 lg:pl-56 lg:pt-16">
        <h1 className="text-2xl mb-4">Delivery</h1>
        <form className="flex flex-col gap-y-4">
          <label>
            <input
              type="text"
              placeholder="INDIA"
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

      {/* Right Section */}
      <div className="lg:w-[50%] w-full h-auto border-t-2 lg:border-t-2 border-black lg:pl-12 lg:pt-16">
        <div className="w-full lg:w-[35.5rem] space-y-4">
          <div className="flex space-x-4">
            <div className="w-20 h-24 flex-shrink-0 flex justify-center items-center">Image</div>
            <div className="h-24 flex-grow flex justify-between items-center p-4">
              <span>Details</span>
              <span>Price</span>
            </div>
          </div>
          <div className="flex justify-between text-lg">
            <span>Total Items:</span>
            <span>Number</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipment:</span>
            <span>Price</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>Price</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
