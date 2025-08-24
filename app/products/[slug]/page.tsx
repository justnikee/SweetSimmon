import React from "react";
import { prisma } from "@/lib/prisma";
import ProductComponent from "../components/product-component";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      notFound();
    }

    return (
      <div className="pb-20 pt-8">
        <div className="max-w-[1440px] px-10 m-auto">
          <div className="text-[10px] mb-6 flex items-center gap-1.5">
            <Link className="uppercase text-[#495a6f]" href="/">
              Home
            </Link>{" "}
            /{" "}
            <Link
              className="text-black font-extrabold"
              href={`/products/${product.slug}`}
            >
              {product.title}
            </Link>
          </div>
          <ProductComponent product={product} />
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("❌ Product page error:", error);
    throw error;
  }
};

export default page;
