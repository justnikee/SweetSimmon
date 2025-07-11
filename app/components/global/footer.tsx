import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-20 bg-lightblue mt-2">
      <div className="px-20 flex flex-col gap-14 max-w-[1440px] m-auto">
        <div className="flex justify-between">
          <div className="relative">
            <Image
              src={"/images/site-logo/site-logo.webp"}
              height={100}
              width={100}
              alt="Logo"
              className="mb-8"
            />
            <p className="text-primary text-[12px] mb-4">LET'S CONNECT</p>
            <p className="text-primary text-sm">
              Subscribe to our newsletter and get 10% off your first order.
            </p>
            <form className="w-full flex items-center mt-3.5 border-b">
              <input
                className="bg-transparent w-full h-full py-2.5 focus-visible:outline-none"
                type="email"
                placeholder=""
              />
              <button className="text-primary text-[12px] cursor-pointer h-full uppercase">
                Subscribe
              </button>
            </form>
            <span className="text-primary text-[10px] mt-4 block">
              © 2025 Aevi Wellness – Aevi Wellness AB, Klocka 185, 837 71 Duved,
              Sweden
            </span>
          </div>
          <div className="flex gap-20">
            <ul>
              <h3 className="text-sm text-primary mb-2">INFO</h3>
              <li className="text-primary text-[16px] mb-2 hover:underline">
                Account
              </li>
              <li className="text-primary text-[16px] mb-2 hover:underline">
                Privacy Policy
              </li>
            </ul>
            <ul>
              <h3 className="text-sm text-primary mb-2">SUPPORT</h3>
              <li className="text-primary text-[16px] mb-2 hover:underline">
                Contact
              </li>
              <li className="text-primary text-[16px] mb-2 hover:underline">
                FAQ
              </li>
            </ul>
            <ul>
              <h3 className="text-sm text-primary mb-2">CONNECT</h3>
              <li className="text-primary text-[16px] mb-2 hover:underline">
                Instagram
              </li>
              <li className="text-primary text-[16px] mb-2 hover:underline">
                X
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
