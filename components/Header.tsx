// Header.tsx
import { logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import CartButton from "./CartButton";
import FavoriteButton from "./FavoriteButton";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import HeaderBottom from "./HeaderBottom";
import SearchInput from "./SearchInput";
import { fetchData } from "@/hooks/fetchData";

const Header = async () => {
  const endpoint = "https://dummyjson.com/products/category-list";
  const session = await auth();
  const categories = await fetchData(endpoint);

  return (
    <header className="bg-transparent sticky top-0 z-50">
      <div className="w-full h-14 bg-amazonBlue text-lightText sticky top-0 z-50">
        <div className="h-full w-full flex items-center justify-between gap-1 px-2">
          <Link href={"/"} className="shrink-0 w-16 md:w-24">
            <Image
              className="w-full object-contain"
              src={logo}
              alt="logo"
              priority
            />
          </Link>

          <div className="hidden md:flex flex-1 mx-1 min-w-[100px]">
            <SearchInput categories={categories} />
          </div>

          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {session?.user ? <SignOutButton /> : <SignInButton />}
            <FavoriteButton />
            <CartButton />
          </div>
        </div>
      </div>
      <HeaderBottom />
    </header>
  );
};

export default Header;
