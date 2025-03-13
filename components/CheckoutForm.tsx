"use client";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/order-success` },
    });

    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-6"
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
