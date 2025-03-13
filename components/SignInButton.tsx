import { signIn } from "@/auth";
import React from "react";
import { BiCaretDown } from "react-icons/bi";

const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
      className="text-xxs xs:text-xs text-gray-100 flex flex-col justify-center px-1 sm:px-2 hover:scale-110 cursor-pointer duration-300 h-[60%] sm:h-[65%] md:h-[70%]"
    >
      <button className="text-left text-white font-semibold md:text-gray-100 md:font-normal text-sm sm:max-w-full">
        Hello, sign in
      </button>
      <button
        type="submit"
        className="text-white font-bold hidden sm:flex items-center text-xxs xs:text-xs leading-tight"
      >
        Account & Lists{" "}
        <span>
          <BiCaretDown className="text-xs" />
        </span>
      </button>
    </form>
  );
};

export default SignInButton;
