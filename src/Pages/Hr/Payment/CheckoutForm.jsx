import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAuth from "../../../ReactHooks/useAuth";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const { user } = useAuth();
  const [userInfo] = useUserInfo();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { packs } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { packs })

      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, packs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    //confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: name?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm Error");
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("Transaction id ", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        userInfo.pack = userInfo.pack + packs;

        try {
          userInfo;
          await axiosSecure.patch(`/userHr/${userInfo?._id}`, userInfo);
          toast.success(
            "Payment Success now you can add employees in your team"
          );

          setTimeout(() => {
            navigate("/");
          }, 500);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="text-center">
          <button
            className="text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 my-10 px-10 text-xl font-semibold uppercase text-md  text-white border-0 text-md btn "
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
        <p className="text-red-500">{error}</p>
        {transactionId && (
          <p className="text-center text-green-500 py-10">{transactionId}</p>
        )}
      </form>
      <Toaster />
    </div>
  );
};

export default CheckoutForm;
