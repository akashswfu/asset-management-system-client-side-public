import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Package = () => {
  const handleBuy = () => {
    toast.error("Without Login you cannot buy a plan");
  };
  return (
    <div>
      <h1 className="text-center uppercase text-2xl md:text-4xl pt-6 md:pt-20 text-green-500 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 bg-clip-text">
        Chose Your Plan
      </h1>
      <div className="grid mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="py-10 rounded-2xl bg-gradient-to-r text-center from-sky-400 to-sky-500  md:flex flex-col justify-center items-center w-full h-full space-y-5 top-0">
          <div className=" rounded-lg py-12 flex flex-col justify-center items-center space-y-3">
            <h1 className="text-3xl font-semibold">Easy Plan</h1>
            <div className="flex font-bold items-end pb-5">
              <h1 className="text-3xl">$5 </h1>
              <p>/5 Employees</p>{" "}
            </div>
            <button
              onClick={handleBuy}
              className="btn  text-white  bg-gradient-to-r text-center from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  text-xl px-7 "
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="py-10 rounded-2xl bg-gradient-to-r text-center from-sky-400 to-sky-500  md:flex flex-col justify-center items-center w-full h-full space-y-5 top-0">
          <div className=" rounded-lg py-12 flex flex-col justify-center items-center space-y-3">
            <h1 className="text-3xl font-semibold">Gold Plan</h1>
            <div className="flex font-bold items-end pb-5">
              <h1 className="text-3xl">$8 </h1>
              <p>/10 Employees</p>{" "}
            </div>
            <button
              onClick={handleBuy}
              className="btn  text-white  bg-gradient-to-r text-center from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  text-xl px-7 "
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="py-10 rounded-2xl bg-gradient-to-r text-center from-sky-400 to-sky-500  md:flex flex-col justify-center items-center w-full h-full space-y-5 top-0">
          <div className=" rounded-lg py-12 flex flex-col justify-center items-center space-y-3">
            <h1 className="text-3xl font-semibold">Platinum Plan</h1>
            <div className="flex font-bold items-end pb-5">
              <h1 className="text-3xl">$15 </h1>
              <p>/20 Employees</p>{" "}
            </div>
            <button
              onClick={handleBuy}
              className="btn  text-white  bg-gradient-to-r text-center from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  text-xl px-7 "
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Package;
