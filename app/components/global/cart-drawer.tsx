import { X, Plus, Minus } from "lucide-react";
import React from "react";
import Image from "next/image";
import Button from "../ui/Button";

type CartDraerProp = {
  isOpen: boolean;
  onToggle: (newState: boolean) => void;
};

const CartDrawer = ({ isOpen, onToggle }: CartDraerProp) => {
  return (
    <div
      className={`fixed top-0 right-0 z-[9999] transition-transform ease-in-out duration-500 h-screen w-lg bg-white ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 relative w-full h-full">
        <div className="flex justify-between items-center ">
          <h3 className="uppercase text-lg text-primary">Shopping Cart</h3>
          <span onClick={() => onToggle(false)}>
            <X
              className="w-5 h-5 text-primary transition-transform duration-200 hover:rotate-90 cursor-pointer"
              strokeWidth={1}
            />
          </span>
        </div>
        <div className="mt-12">
          <FreeShippingBar />
          <CartItme />
          <CartItme />
        </div>
        <Checkout />
      </div>
    </div>
  );
};

function CartItme() {
  return (
    <div className="flex mb-6 ">
      <Image
        src={"/images/collection-section/Aevi-Web-Homepage-04.webp"}
        height={400}
        width={400}
        alt=""
        className="h-[135px] w-24 object-cover"
      />
      <div className="px-4 py-2 w-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <h3 className="uppercase text-sm text-primary font-extrabold">
            Product Title
          </h3>
          <X className="w-4 h-4 text-primary cursor-pointer" strokeWidth={1} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-primary">$96</span>
          <QuantitySelector />
        </div>
      </div>
    </div>
  );
}

function FreeShippingBar() {
  return (
    <div className="mb-6">
      <h2 className="text-sm text-primary mb-2">
        You qualified for free shipping!
      </h2>
      <div className="w-full h-2 rounded-full bg-lightblue"></div>
    </div>
  );
}

const QuantitySelector = () => {
  return (
    <div className="flex items-center border border-[#d5e0ea]">
      <button className="flex items-center justify-center">
        <Minus
          size={16}
          color="#231f20"
          strokeWidth={0.5}
          absoluteStrokeWidth
        />
      </button>

      <input
        type="text"
        value="1"
        readOnly
        className="w-5 text-center px-1 text-[12px] border-r border-l border-[#d5e0ea]"
      />
      <button className="flex items-center justify-center">
        <Plus size={16} color="#231f20" strokeWidth={0.5} absoluteStrokeWidth />
      </button>
    </div>
  );
};

function Checkout() {
  return (
    <div className="absolute bottom-0 left-0 w-full px-5 flex flex-col pt-6 pb-6 border-t border-lightblue">
      <Button className="block ">Checkout</Button>
      <span className="text-[12px] mt-1">
        Shipping and taxes calculated at checkout
      </span>
    </div>
  );
}

export default CartDrawer;
