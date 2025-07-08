import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-8 bg-lightblue mt-2">
      <div className="px-20 flex flex-col gap-14">
        <div className="flex justify-between">
          <div className="relative">
            <h2 className="text-black text-4xl mb-4 italic font-extralight">
              Join the legacy club
            </h2>
            <p className="text-black text-lg">
              sign up to be the first to know about new arrivals & exclusive
              offers.
            </p>
            <form className="w-full flex items-center h-14 mt-3.5">
              <input
                className="bg-[#DDDAD4] w-full h-full placeholder:text-black placeholder:uppercase px-4"
                type="email"
                placeholder="Enter E-mail Address"
              />
              <button className="text-black h-full px-6 uppercase bg-[#DDDAD4]">
                Submit
              </button>
            </form>
          </div>
          <div className="flex gap-20">
            <ul>
              <h3 className="text-xl text-black mb-2">INFO</h3>
              <li className="text-black text-lg">Account</li>
              <li className="text-black text-lg">Privacy Policy</li>
            </ul>
            <ul>
              <h3 className="text-xl text-black mb-2">SUPPORT</h3>
              <li className="text-black text-lg">Contact</li>
              <li className="text-black text-lg">FAQ</li>
            </ul>
            <ul>
              <h3 className="text-xl text-black mb-2">CONNECT</h3>
              <li className="text-black text-lg">Instagram</li>
              <li className="text-black text-lg">X</li>
            </ul>
          </div>
        </div>
        <div>
          <Image
            src={"/images/footer-images/svgviewer-png-output.png"}
            height={500}
            width={1920}
            alt="logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
