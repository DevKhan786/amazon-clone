// SignOutButton.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { UserCircle } from "lucide-react";

const SignOutButton = () => {
  const { data: session } = useSession();
  const [imageError, setImageError] = useState(false);

  if (!session) return null;

  return (
    <div className="text-sm md:text-lg text-gray-100 flex gap-1 items-center px-1 hover:scale-110 cursor-pointer duration-300 h-full">
      <div className="relative h-6 w-6 md:h-8 md:w-8 rounded-full bg-gray-100">
        {session?.user?.image && !imageError ? (
          <Image
            src={session.user.image}
            alt="userImage"
            fill
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <UserCircle className="h-full w-full text-gray-500 p-0.5" />
        )}
      </div>

      <div className="hidden xs:block ml-1">
        <p className="truncate text-xs md:text-sm">
          Hi, {session?.user?.name?.split(" ")[0]}
        </p>
        <button
          onClick={() => signOut()}
          className="text-white font-bold text-xs md:text-sm"
        >
          Sign Out
        </button>
      </div>
      <button
        onClick={() => signOut()}
        className="xs:hidden text-white font-bold px-2 text-sm md:text-lg"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
