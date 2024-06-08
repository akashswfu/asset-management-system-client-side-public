import React from "react";

const Package = () => {
  return (
    <div>
      <div className="grid mt-16 grid-cols-1 md:grid-cols-3 gap-10">
        <div className=" rounded-lg py-12 flex flex-col justify-center items-center bg-blue-200 space-y-3">
          <h1 className="text-xl font-semibold">Easy Plan</h1>
          <div className="flex font-bold items-end">
            <h1 className="text-4xl">$5 </h1>
            <p>/5 Employees</p>{" "}
          </div>
          <button className="btn btn-success text-white">Buy Now</button>
        </div>

        <div className=" rounded-lg py-12 flex flex-col justify-center items-center bg-blue-200 space-y-3">
          <h1 className="text-xl font-semibold">Gold Plan</h1>
          <div className="flex font-bold items-end">
            <h1 className="text-4xl">$8 </h1>
            <p>/10 Eployees</p>{" "}
          </div>
          <button className="btn btn-success text-white">Buy Now</button>
        </div>

        <div className=" rounded-lg py-12 flex flex-col justify-center items-center bg-blue-200 space-y-3">
          <h1 className="text-xl font-semibold">Platinum Plan</h1>
          <div className="flex font-bold items-end">
            <h1 className="text-4xl">$15 </h1>
            <p>/20 Employees</p>{" "}
          </div>
          <button className="btn btn-success text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Package;
