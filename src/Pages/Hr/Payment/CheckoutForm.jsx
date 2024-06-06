import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAuth from "../../../ReactHooks/useAuth";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { useNavigate } from "react-router-dom";

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
          alert("Payment Success now you can add employees in your team");

          setTimeout(() => {
            navigate("/");
          }, 500);
        } catch (err) {
          console.log(err);
        }

        // const payment = {
        //   email: user?.email,
        //   price: totalPrice,
        //   transactionId: paymentIntent.id,
        //   data: new Date(),
        //   cartIds: cart.map((item) => item._id),
        //   menuItemIds: cart.map((item) => item.menuId),
        //   status: "pending",
        // };
        // const res = await axiosSecure.post("/payments", payment);
        // refetch();
        // if (res.data?.paymentResult?.insertedId) {
        //   alert("Payment Success");
        // }
        // navigate("/dashboard/paymentHistory");
      }
    }
  };
  return (
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
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-center text-green-500 py-10">{transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
