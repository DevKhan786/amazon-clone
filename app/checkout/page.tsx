// app/checkout/page.tsx
"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { store } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import CheckoutForm from "@/components/CheckoutForm";

// Load stripe outside of component to avoid recreating it on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage() {
  const { cartProduct } = store();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Redirect if cart is empty
    if (cartProduct.length === 0) {
      router.push("/cart");
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartProduct }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Payment setup failed");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        console.error("Checkout error:", err);
        setError(errorMessage || "Failed to initialize payment gateway");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [cartProduct, router]);

  return (
    <Container className="py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Setting up your payment...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <button
              onClick={() => router.push("/cart")}
              className="mt-2 underline"
            >
              Return to cart
            </button>
          </div>
        )}

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#0F172A",
                },
              },
            }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </Container>
  );
}
