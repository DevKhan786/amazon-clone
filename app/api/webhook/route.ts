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

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session completed: ${checkoutSession.id}`);
        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        if (!paymentIntent.metadata?.items) {
          console.error("No items found in payment intent metadata");
          return new NextResponse(null, { status: 200 });
        }

        const items = JSON.parse(paymentIntent.metadata.items);

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

        console.log(`Order processed: ${paymentIntent.id}`);
        break;

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment failed: ${failedPaymentIntent.id}`);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    console.error(`Webhook Error: ${error.message}`);

    return new NextResponse(null, { status: 200 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
