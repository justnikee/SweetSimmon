"use client";
import { useEffect } from "react";

const page = () => {
  async function getorders() {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/api/orders`
      );
      const data = await res.json();

      //   if (data.status != 200) {
      //     console.log("some error on api --> check /api/orders/route.ts");
      //   }

      const orders = await data;
      console.log("orders", orders);
    } catch (error) {
      console.log("some error on api --> check /api/orders/route.ts");
    }
  }

  useEffect(() => {
    getorders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <div className="flex flex-col gap-3.5"></div>
    </div>
  );
};

export default page;
