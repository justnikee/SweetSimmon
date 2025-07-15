import React from "react";
import ProductComponent from "../components/product-component";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/products/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );
  const data = await res.json();
  const product = await data.product;
  return (
    <div className="py-20">
      <div className="max-w-[1440px] px-10 m-auto">
        <ProductComponent product={product} />
      </div>
    </div>
  );
};

export default page;
