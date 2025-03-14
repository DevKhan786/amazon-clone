// FavoriteButton.tsx
"use client";
import Link from "next/link";
import React from "react";
import { store } from "../lib/store";
import { FaHeart } from "react-icons/fa";

const FavoriteButton = () => {
  const { favoriteProduct } = store();
  return (
    <Link
      href={"/favorite"}
      className="flex items-center px-1 hover:scale-110 cursor-pointer duration-300 h-full relative min-w-[60px]"
    >
      <div className="hidden xs:flex flex-col">
        <p className="text-sm md:text-lg text-gray-100">Your</p>
        <p className="text-sm md:text-lg text-white font-bold">Favorites</p>
      </div>

      <div className="flex xs:hidden items-center justify-center relative w-full">
        <FaHeart className="text-white text-base md:text-xl" />
        <span className="absolute -top-2 right-1 w-4 h-4 rounded-full bg-amazonOrangeDark flex items-center justify-center text-[10px] md:text-sm text-black font-bold">
          {favoriteProduct?.length || 0}
        </span>
      </div>
    </Link>
  );
};

export default FavoriteButton;