// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "@/type";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || !items.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Calculate total amount in cents
    const amount = items.reduce((total: number, item: Product) => {
      return total + Math.round(item.price * 100) * (item.quantity || 1);
    }, 0);

    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      // Store cart items as metadata
      metadata: {
        items: JSON.stringify(
          items.map((item: Product) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity || 1,
          }))
        ),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe API error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
