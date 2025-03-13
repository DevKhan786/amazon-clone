// components/CheckoutForm.tsx
"use client";
import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { store } from "@/lib/store";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const { resetCart } = store();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsLoading(true);
    setPaymentError("");

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Redirect to the order success page after payment
          return_url: `${window.location.origin}/order-success`,
        },
      });

      // If error, display message
      if (error) {
        setPaymentError(
          error.message || "Something went wrong with your payment"
        );
        setIsLoading(false);
      } else {
        // Successful payment would redirect to return_url
        resetCart();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Payment error:", err);
      setPaymentError(errorMessage || "Payment failed");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {paymentError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {paymentError}
        </div>
      )}

      <PaymentElement />

      <div className="pt-4">
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className={`w-full py-3 px-4 text-white rounded-md ${
            isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } transition-colors`}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center">
        Your payment is processed securely with Stripe.
      </p>
    </form>
  );
}
