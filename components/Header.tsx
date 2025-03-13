import { logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { auth } from "@/auth";
import CartButton from "./CartButton";
import FavoriteButton from "./FavoriteButton";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import HeaderBottom from "./HeaderBottom";
import SearchInput from "./SearchInput";
import OrderBtn from "./OrderBtn";
import { fetchData } from "@/hooks/fetchData";

const Header = async () => {
  const endpoint = "https://dummyjson.com/products/category-list";
  const session = await auth();
  const categories = await fetchData(endpoint);

  return (
    <header className="bg-transparent sticky top-0 z-50">
      <div className="w-full h-16 sm:h-18 md:h-20 bg-amazonBlue text-lightText sticky top-0 z-50">
        <div className="h-full w-full inline-flex items-center justify-between gap-1 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4">
          {/* Logo */}
          <Link href={"/"}>
            <div className="headerItem">
              <Image
                className="w-20 sm:w-24 md:w-28 object-cover mt-1"
                src={logo}
                alt="logo"
                priority
              />
            </div>
          </Link>
          {/* Deliver */}
          <div className="headerItem hidden lg:inline-flex gap-1">
            <SlLocationPin className="text-base md:text-lg text-white" />
            <div className="text-xxs sm:text-xs">
              <p>Deliver to</p>
              <p className="text-white font-bold uppercase">USA</p>
            </div>
          </div>
          <SearchInput categories={categories} />

          {session?.user ? <SignOutButton /> : <SignInButton />}

          {/* Favorite */}
          <FavoriteButton />
          {/* Cart */}
          <CartButton />
        </div>
      </div>
      <HeaderBottom />
    </header>
  );
};

export default Header;
