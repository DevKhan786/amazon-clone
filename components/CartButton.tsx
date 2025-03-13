"use client";

import Link from "next/link";
import React from "react";

import { store } from "../lib/store";

const CartButton = () => {
  const { cartProduct } = store();

  return (
    <Link
      href={"/cart"}
      className="flex items-center px-1 sm:px-2 hover:scale-110 cursor-pointer duration-300 h-[60%] sm:h-[65%] md:h-[70%] relative"
    >
      <p className="text-xxs xs:text-xs text-white font-bold mt-2 sm:mt-3">
        Cart
      </p>
      <span className="absolute top-1 left-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amazonOrangeDark flex items-center justify-center text-xxs xs:text-sm text-black font-bold md:left-9 md:top-2">
        {cartProduct ? cartProduct.length : 0}
      </span>
    </Link>
  );
};

export default CartButton;
