import Link from "next/link";
import React from "react";

const OrderBtn = () => {
  return (
    <Link
      href={"/orders"}
      className="text-xxs xs:text-xs text-gray-100 flex flex-col justify-center px-1 sm:px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[60%] sm:h-[65%] md:h-[70%] relative"
    >
      <p className="hidden xs:block">Orders</p>
      <p className="text-white text-xxs xs:text-xs font-bold whitespace-nowrap">
        <span className="hidden xs:inline">& </span>Items
      </p>

      <span className="absolute right-1 sm:right-2 top-1 sm:top-2 w-3 h-3 sm:w-4 sm:h-4 border-[1px] border-gray-400 flex items-center justify-center text-xxs xs:text-xs text-amazonOrangeDark font-medium rounded-sm">
        0
      </span>
    </Link>
  );
};

export default OrderBtn;