// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDB } from "../../../firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_KEY!;

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Add type safety and null checks
      if (
        !session.amount_total ||
        !session.customer_email ||
        !session.metadata?.items
      ) {
        throw new Error("Missing required session data");
      }

      // Parse items from metadata
      const items = JSON.parse(session.metadata.items);

      await adminDB
        .collection("orders")
        .doc(session.id)
        .set({
          email: session.customer_email,
          amount: session.amount_total / 100, // Now safe to divide
          items: items,
          currency: session.currency?.toUpperCase() || "USD",
          timestamp: new Date().toISOString(),
          status: "completed",
          payment_intent: session.payment_intent,
        });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
