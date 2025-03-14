// CartButton.tsx
"use client";

import Link from "next/link";
import React from "react";
import { store } from "../lib/store";

const CartButton = () => {
  const { cartProduct } = store();

  return (
    <Link
      href={"/cart"}
      className="flex items-center px-1 hover:scale-110 cursor-pointer duration-300 h-full relative min-w-[60px]"
    >
      <p className="text-sm md:text-lg text-white font-bold">Cart</p>
      <span className="absolute -top-1 right-3 w-4 h-4 rounded-full bg-amazonOrangeDark flex items-center justify-center text-[10px] md:text-sm text-black font-bold">
        {cartProduct?.length || 0}
      </span>
    </Link>
  );
};

export default CartButton;
