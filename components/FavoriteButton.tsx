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
      className="flex items-center px-1 sm:px-2 hover:scale-110 cursor-pointer duration-300 h-[60%] sm:h-[65%] md:h-[70%] relative"
    >
      <div className="hidden xs:flex flex-col">
        <p className="text-xxs xs:text-xs text-gray-100">Your</p>
        <p className="text-xxs xs:text-xs text-white font-bold">Favorites</p>
      </div>

      <div className="flex xs:hidden items-center justify-center">
        <FaHeart className="text-white text-lg" />
      </div>

      <span className="absolute top-1 left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amazonOrangeDark flex items-center justify-center text-xxs xs:text-xs text-black font-bold">
        {favoriteProduct?.length > 0 ? favoriteProduct?.length : 0}
      </span>
    </Link>
  );
};

export default FavoriteButton;
