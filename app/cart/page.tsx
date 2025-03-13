import { auth } from "@/auth";
import CartProducts from "@/components/CartProducts";
import Container from "@/components/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cart | Amazon Online Shopping",
};

const CartPage = async () => {
  const session = await auth();
  return (
    <Container>
      <CartProducts isAuthenticated={!!session?.user} />
    </Container>
  );
};

export default CartPage;
