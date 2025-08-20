import React from "react";
import { prisma } from "@/lib/prisma";
import ProductComponent from "../components/product-component";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  console.log("🔍 Product page: Starting...");

  try {
    const { slug } = await params;
    console.log("🔍 Product page: Slug =", slug);

    const product = await prisma.product.findUnique({
      where: { slug },
    });
    console.log("🔍 Product page: Product found =", !!product);
    console.log(
      "🔍 Product page: Product data =",
      JSON.stringify(product, null, 2)
    );

    if (!product) {
      console.log("🔍 Product page: Product not found, calling notFound()");
      notFound();
    }

    console.log("🔍 Product page: About to render ProductComponent");
    return (
      <div className="pb-20 pt-8">
        <div className="max-w-[1440px] px-10 m-auto">
          <div className="text-[10px] mb-6 flex items-center gap-1.5">
            <Link className="uppercase text-[#495a6f]" href={"/"}>
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
    console.error("❌ Error stack:", error.stack);
    throw error;
  }
};

export default page;
