// SignInButton.tsx
import { signIn } from "@/auth";
import React from "react";
import { BiCaretDown } from "react-icons/bi";
import { UserCircle } from "lucide-react";

const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
      className="text-sm md:text-lg text-gray-100 flex items-center gap-1 px-1 hover:scale-110 cursor-pointer duration-300 h-full min-w-[80px]"
    >
      <UserCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
      <div className="flex flex-col">
        <button className="text-left text-white font-semibold text-xs md:text-sm">
          Hello, sign in
        </button>
        <button
          type="submit"
          className="text-white font-bold hidden sm:flex items-center gap-1 text-xs md:text-sm"
        >
          Account <BiCaretDown className="text-xs md:text-sm" />
        </button>
      </div>
    </form>
  );
};

export default SignInButton;
