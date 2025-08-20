"use client";

import { X, Plus, Minus } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity, closeCart } from "@/store/slice/cartSlice";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";

type CartItemProps = {
  item: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    images?: string[];
  };
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images?: string[];
};

type QuantitySelectorProps = {
  quantity: number;
  item: CartItem;
};

type CartDraerProp = {
  isOpen: boolean;
  onToggle: (newState: boolean) => void;
};

type User = {
  name: string;
  email: string;
};

const CartDrawer = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);

  if (isOpen) {
    document.querySelector(".overlay")?.classList.add("active");
  } else {
    document.querySelector(".overlay")?.classList.remove("active");
  }

  return (
    <div
      style={{
        boxShadow: "-10px 0 20px -5px rgba(0, 0, 0, 0.1)",
      }}
      className={`fixed top-0 right-0 z-[9999] transition-transform ease-in-out duration-500 h-screen w-lg bg-white ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 relative w-full h-full">
        <div className="flex justify-between items-center ">
          <h3 className="uppercase text-lg text-primary">Shopping Cart</h3>
          <span className="block" onClick={() => dispatch(closeCart())}>
            <X
              className="w-5 h-5 text-primary transition-transform duration-200 hover:rotate-90 cursor-pointer"
              strokeWidth={1}
            />
          </span>
        </div>
        <div className="mt-12">
          <FreeShippingBar />
          <div className="">
            {items ? (
              <>
                {items.map((item) => (
                  <CartItme key={item.id} item={item} />
                ))}
              </>
            ) : (
              <span>Cart is Empty</span>
            )}
          </div>
        </div>
        <Checkout />
      </div>
    </div>
  );
};

function CartItme({ item }: CartItemProps) {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeItem(item.id));
  }

  return (
    <div className="flex mb-6 ">
      {item.images && (
        <Image
          src={item.images[0]}
          height={400}
          width={400}
          alt=""
          className="h-[135px] w-24 object-cover"
        />
      )}

      <div className="px-4 py-2 w-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <h3 className="uppercase text-sm text-primary font-extrabold">
            {item.title}
          </h3>
          <span onClick={handleRemove}>
            <X
              className="w-4 h-4 text-primary cursor-pointer"
              strokeWidth={1}
            />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-primary">${item.price}</span>
          <QuantitySelector item={item} quantity={item.quantity} />
        </div>
      </div>
    </div>
  );
}

function FreeShippingBar() {
  const items = useSelector((state: RootState) => state.cart.items);
  const itemsCount = items.length;

  const cartTotal = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  const freeShipping = 150;
  let percentage =
    cartTotal >= freeShipping
      ? 100
      : Math.round((cartTotal / freeShipping) * 100);

  return (
    <div className="mb-6">
      <h2 className="text-sm text-primary mb-2">
        {itemsCount < 1 ? (
          "Your shopping cart is empty."
        ) : (
          <>
            {cartTotal >= freeShipping
              ? "You qualified for free shipping!"
              : `€${freeShipping - cartTotal} away from free shipping!`}
          </>
        )}
      </h2>
      {itemsCount < 1 ? (
        ""
      ) : (
        <>
          <div className="border-lightblue border-[0.5px] rounded-full">
            <div
              style={{ width: `${percentage}%` }}
              className="h-2 bg-lightblue transition-all ease-in-out duration-300"
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

const QuantitySelector = ({ quantity, item }: QuantitySelectorProps) => {
  const dispatch = useDispatch();

  function handleMinus() {
    if (quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  }

  function handlePlus() {
    dispatch(updateQuantity({ id: item.id, quantity: quantity + 1 }));
  }

  return (
    <div className="flex items-center border border-[#d5e0ea]">
      <button
        onClick={handleMinus}
        className="flex items-center justify-center cursor-pointer"
      >
        <Minus
          size={16}
          color="#231f20"
          strokeWidth={0.5}
          absoluteStrokeWidth
        />
      </button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="w-5 text-center px-1 text-[12px] border-r border-l border-[#d5e0ea]"
      />
      <button
        onClick={handlePlus}
        className="flex items-center justify-center cursor-pointer"
      >
        <Plus size={16} color="#231f20" strokeWidth={0.5} absoluteStrokeWidth />
      </button>
    </div>
  );
};

function Checkout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);

  const handleCheckout = async () => {
    const user = await getUserFromToken();

    if (!user) {
      dispatch(closeCart());
      redirect("/account/login");
      return;
    }

    setLoading(true);
    const res = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Checkout error:", data.error);
    }

    setLoading(false);
  };
  const cartTolal = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white px-5 flex flex-col pt-6 pb-6 border-t border-lightblue">
      <Button onClick={handleCheckout} className="block ">
        {loading ? "Redirecting..." : <>Checkout | ${cartTolal}</>}
      </Button>
      <span className="text-[12px] mt-1">
        Shipping and taxes calculated at checkout
      </span>
    </div>
  );
}

export default CartDrawer;
