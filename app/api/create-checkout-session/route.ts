import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { items } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_NEXT_AUTH_URL}/order-success`,
    cancel_url: `${process.env.NEXT_PUBLIC_NEXT_AUTH_URL}/cart`,
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}
