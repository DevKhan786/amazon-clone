"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const SignOutButton = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="text-xxs xs:text-xs text-gray-100 flex gap-1 sm:gap-2 items-center px-1 sm:px-2 hover:scale-110 cursor-pointer duration-300 h-[60%] sm:h-[65%] md:h-[70%]">
      <Image
        src={session?.user?.image as string}
        alt="userImage"
        width={200}
        height={200}
        className="w-6 xs:w-8 sm:w-10 rounded-full object-cover"
      />
      <div className="hidden xs:block">
        <p className="leading-tight text-sm   sm:max-w-[120px]">
          Hello, {session?.user?.name?.split(" ")[0]}
        </p>
        <button
          onClick={() => signOut()}
          className="text-white font-bold flex items-center text-xxs xs:text-xs leading-tight"
        >
          Log out
        </button>
      </div>
      <button
        onClick={() => signOut()}
        className="block xs:hidden text-white font-bold text-xxs leading-tight"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
