"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import MegaMenu from "./mega-menu";
import Discover from "./mega-menu-discover";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { openCart } from "@/store/slice/cartSlice";
import { openSearchBar } from "@/store/slice/searchSlice";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();
  const isHome = pathName === "/";

  const [isOpenDiscover, setIsOpenDiscover] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const isOpen = useSelector((state: RootState) => state.cart.isOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  return (
    <header
      className={`${
        scrollY > 0 ? "bg-white" : "bg-transparent"
      } hover:bg-white z-[13] sticky top-0 transition-colors duration-200 ease-in-out group border-t border-white ${
        isHome ? "header-home" : "header-otherPages"
      }`}
    >
      <div className="container gap-2 hidden md:flex md:justify-between md:items-center relative">
        <div className="flex gap-4 items-center">
          <div
            className="relative py-6"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            <span
              className={`${
                scrollY > 0 ? "text-primary" : "text-white"
              } text-sm uppercase cursor-pointer hover:font-extrabold hover:underline group-hover:text-primary`}
            >
              Shop
            </span>
          </div>

          <div
            onMouseEnter={() => setIsOpenDiscover(true)}
            onMouseLeave={() => setIsOpenDiscover(false)}
            className="relative py-6"
          >
            <span
              className={`${
                scrollY > 0 ? "text-primary" : "text-white"
              } text-sm uppercase cursor-pointer hover:font-extrabold hover:underline group-hover:text-primary`}
            >
              Discover
            </span>
          </div>
        </div>

        <Link className="text-primary text-4xl" href="/">
          <Image
            className={`${
              scrollY < 1 ? "opacity-0" : "opacity-100"
            } transition ease-in-out duration-150 group-hover:opacity-100`}
            src="/images/logo.png"
            alt="logo"
            height={40}
            width={128}
          />
        </Link>

        <div className="flex gap-4">
          <div
            onClick={() => dispatch(openSearchBar())}
            className="cursor-pointer"
          >
            <Search size={20} strokeWidth={0.8} />
          </div>
          <Link className="text-primary text-sm" href={"/account"}>
            <User size={20} strokeWidth={0.8} />
          </Link>
          <div onClick={() => dispatch(openCart())}>
            <ShoppingCart
              className="cursor-pointer"
              size={20}
              strokeWidth={0.8}
            />
          </div>
        </div>

        {isShopOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full w-screen z-50 bg-white shadow-lg border-t border-b px-12 py-8 flex gap-10 text-sm"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            <MegaMenu />
          </motion.div>
        )}

        {isOpenDiscover && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full w-screen z-50 bg-white shadow-lg border-t border-b px-12 py-8 flex gap-10 text-sm"
            onMouseEnter={() => setIsOpenDiscover(true)}
            onMouseLeave={() => setIsOpenDiscover(false)}
          >
            <Discover />
          </motion.div>
        )}
      </div>
    </header>
  );
};

function MobileMenu() {
  return <div></div>;
}

export default Header;
