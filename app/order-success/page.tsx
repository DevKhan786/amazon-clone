"use client";
import { useEffect } from "react";
import Container from "@/components/Container";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { store } from "@/lib/store";
import { useSession } from "next-auth/react";

export default function OrderSuccessPage() {
  const { resetCart } = store();
  const { data: session } = useSession();

  useEffect(() => {
    resetCart();
  }, [resetCart]);

  return (
    <Container className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-8">
          Thank you for your order
          {session?.user ? `, ${session.user.name}` : ""}.
          {session?.user?.email &&
            ` We've sent a confirmation email to ${session.user.email}.`}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-gray-200 px-6 py-3 rounded-md hover:bg-gray-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </Container>
  );
}
