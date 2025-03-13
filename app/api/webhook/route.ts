// app/api/webhook/route.ts
import { adminDB } from "@/firebase-admin";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY!;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Handle payment success event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Make sure we have the required data
      if (!paymentIntent.metadata?.items) {
        console.error("No items found in payment intent metadata");
        return NextResponse.json(
          { error: "Invalid payment data" },
          { status: 400 }
        );
      }

      // Parse items from metadata
      const items = JSON.parse(paymentIntent.metadata.items);

      // Create order in Firestore
      await adminDB
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          id: paymentIntent.id,
          email: paymentIntent.receipt_email || "guest@example.com",
          value: {
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency.toUpperCase(),
            items: items,
            timestamp: new Date().toISOString(),
            status: "completed",
          },
        });

      return NextResponse.json({ received: true });
    }

    // Return 200 for other event types
    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }
}

// This is needed for Next.js Edge API routes to handle raw body
export const config = {
  api: {
    bodyParser: false,
  },
};
