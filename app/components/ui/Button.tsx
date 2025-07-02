"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  href,
  children,
  className,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline-block px-6 py-2 border border-primary text-primary rounded-full text-sm tracking-wide bg-lightblue transition-colors duration-200 ease-in-out hover:bg-white hover:text-primary";

  if (href) {
    return (
      <Link href={href} className={clsx(baseClasses, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={clsx(baseClasses, className)}>
      {children}
    </button>
  );
}
