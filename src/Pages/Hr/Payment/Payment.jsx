import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  //   const handlePayment = () => {
  //     console.log(selectedPack);
  //   };

  return (
    <div className="min-h-[calc(100vh-400px)] w-full mx-auto flex justify-center">
      <Helmet>
        <title>HR || Payment</title>
      </Helmet>
      <div className="flex flex-col  shadow-2xl text-black  h-full px-10 mx-5 md:mx-0 mt-10 md:mt-0 py-20 rounded-xl  w-[650px] ">
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
