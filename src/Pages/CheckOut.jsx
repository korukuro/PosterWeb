import React from "react";

const CheckOut = () => {
  return (
    <div className="h-[91.2vh] flex">
      <div className="w-[50%] h-full border-2 border-black pl-56 pt-16">
        <h1 className="text-2xl mb-2">Delivery</h1>
        <form className="flex w-[30rem] flex-col gap-y-4">
          <label>
            <input
              type="text"
              placeholder="INDIA"
              className="w-80 h-12 px-2 border-2 border-black rounded "
            />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label>
              <input
                required
                type="text"
                name="firstName"
                placeholder="first name"
                className="form-style w-ful border-2 border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label>
              <input
                required
                type="text"
                placeholder="last name"
                className="form-style w-full border-2 border-black rounded-lg h-12 pl-2"
              />
            </label>
          </div>

          <label className="w-full">
            <input
              required
              type="text"
              placeholder="Address"
              className="form-style w-full border-2 border-black rounded-lg h-12 pl-2"
            />
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex-1">
              <input
                required
                type="text"
                name="firstName"
                placeholder="City"
                className="form-style w-full border-2 border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label className="flex-1">
              <input
                required
                type="text"
                placeholder="State"
                className="form-style w-full border-2 border-black rounded-lg h-12 pl-2"
              />
            </label>
            <label className="flex-1">
              <input
                required
                type="text"
                placeholder="PIN code"
                className="form-style w-full border-2 border-black rounded-lg h-12 pl-2"
              />
            </label>
          </div>

          <div>
            <label className="relative">
              <input
                required
                type="text"
                placeholder="Phone"
                className="form-style w-full border-2 border-black rounded-lg h-12 pl-2"
              />
            </label>
          </div>
        </form>
        <div className="mt-6 w-[30rem]">
          <p>Method of payment</p>
          <div className="">

          </div>
          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-black py-[8px] px-[12px] font-medium text-white flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <span>PAY NOW</span>
          </button>
        </div>
      </div>
      <div className="w-[50%] h-full pl-12 pt-16 border-t-2 border-black border-b-2">
        <div className="w-[35.5rem] space-y-4">
          <div className="flex w-[40rem] space-x-2">
            <div className="w-20 border-2 border-black h-24">image</div>
            <div className="border-2 border-blue-900 h-24 w-[30rem] pt-7 flex justify-between p-2">
              details
              <div>price</div>
            </div>
          </div>
          <div className="flex justify-between text-lg">
            Total Items
            <div>number</div>
          </div>
          <div className="flex justify-between text-sm">
            Shipment
            <div>price</div>
          </div>
          <div className="flex justify-between text-lg">
            Total
            <div>price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
