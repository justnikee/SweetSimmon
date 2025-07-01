import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white py-2 z-10 relative">
      <div className="container gap-2 hidden md:flex md:justify-between md:items-center">
        <div className="flex gap-4">
          <Link
            className="text-[#4E342E] text-sm uppercase"
            href={"/collections/all"}
          >
            Shop
          </Link>
          <Link className="text-[#4E342E] text-sm uppercase" href={"/about"}>
            Discover
          </Link>
        </div>
        <Link className="text-[#4E342E] text-4xl" href="/">
          <Image src="/images/logo.png" alt="logo" height={40} width={128} />
        </Link>
        <div className="flex gap-4">
          <Search size={20} strokeWidth={0.8} />
          <Link className="text-[#4E342E] text-sm" href={"/account"}>
            <User size={20} strokeWidth={0.8} />
          </Link>
          <Link className="text-[#4E342E] text-sm" href={"/cart"}>
            <ShoppingCart size={20} strokeWidth={0.8} />
          </Link>
        </div>
      </div>
    </header>
  );
};

function MobileMenu() {
  return <div></div>;
}
export default Header;
