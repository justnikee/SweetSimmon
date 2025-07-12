"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart } from "lucide-react";
import CartDrawer from "./cart-drawer";
import { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleDrawerToggle(newState: boolean) {
    setIsOpen(newState);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <header className="bg-transparent hover:bg-white py-4 z-[13] sticky top-0 transition-colors duration-200 ease-in-out">
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
          <div onClick={() => setIsOpen(true)}>
            <ShoppingCart
              className="cursor-pointer"
              size={20}
              strokeWidth={0.8}
            />
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isOpen} onToggle={handleDrawerToggle} />
    </header>
  );
};

function MobileMenu() {
  return <div></div>;
}
export default Header;
