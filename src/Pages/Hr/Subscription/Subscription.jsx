import React, { useState } from "react";

const Subscription = () => {
  const [selectedPack, setSelectedPack] = useState(0);

  const handlePayment = () => {
    console.log(selectedPack);
  };

  return (
    <div>
      <h4 className="text-3xl text-center font-semibold justify-center items-center gap-10">
        Choose Your Plan
      </h4>
      <div className="grid mt-16 grid-cols-1 md:grid-cols-3 gap-10">
        <div
          onClick={() => setSelectedPack(5)}
          className=" rounded-lg py-12 flex flex-col justify-center items-center bg-blue-200 space-y-3"
        >
          <h1 className="text-xl font-semibold">Easy Plan</h1>
          <div className="flex font-bold items-end">
            <h1 className="text-4xl">$5 </h1>
            <p>/5 Employees</p>{" "}
          </div>
          <button className="btn btn-success text-white">Buy Now</button>
        </div>

        <div
          onClick={() => setSelectedPack(10)}
          className=" rounded-lg py-12 flex flex-col justify-center items-center bg-blue-200 space-y-3"
        >
          <h1 className="text-xl font-semibold">Gold Plan</h1>
          <div className="flex font-bold items-end">
            <h1 className="text-4xl">$8 </h1>
            <p>/10 Eployees</p>{" "}
          </div>
          <button className="btn btn-success text-white">Buy Now</button>
        </div>

        <div
          onClick={() => setSelectedPack(20)}
          className=" rounded-lg py-12 flex flex-col justify-center items-center bg-blue-200 space-y-3"
        >
          <h1 className="text-xl font-semibold">Platinum Plan</h1>
          <div className="flex font-bold items-end">
            <h1 className="text-4xl">$15 </h1>
            <p>/20 Employees</p>{" "}
          </div>
          <button className="btn btn-success text-white">Buy Now</button>
        </div>
      </div>

      <div className="bg-blue-300 flex items-center text-center mt-10 py-5 justify-center gap-10">
        <h1 className="text-4xl ">
          Your Selected Package :{selectedPack === 5 && "$5 5 Employees"}
          {selectedPack === 10 && "$8 10 Employees"}
          {selectedPack === 20 && "$15 20 Employees"}
        </h1>
        <button onClick={handlePayment} className="btn btn-primary text-lg">
          Pay
        </button>
      </div>
    </div>
  );
};

export default Subscription;
