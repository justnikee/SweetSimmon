import React from "react";
import ShopCards from "@/app/products/components/shop-cards";
import ShopFilter from "@/app/products/components/shop-filter";
import ShopHederText from "../components/shop-header-text";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  id: number;
  title: string;
  images: string[];
  price: number;
  slug: string;
};

async function ProductList({ slug, sort }: { slug: string; sort: string }) {
  const response =
    slug === "all"
      ? await fetch(
          `${
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
          }/api/products?sort=${sort}`,
          { next: { revalidate: 3600 } }
        )
      : await fetch(
          `${
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
          }/api/collections/${slug}?sort=${sort}`,
          { next: { revalidate: 3600 } }
        );

  const products = await response.json();

  if (products.length < 1) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-[#f5f5f5]">
        <h2 className="text-primary uppercase text-5xl">No products found</h2>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 px-8 gap-x-1 gap-y-8">
      {products?.map((product: any) => (
        <ShopCards
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          images={product.images}
          slug={product.slug}
        />
      ))}
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 px-8 gap-x-1 gap-y-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-[600px] mb-4"></div>
          <div className="flex justify-between gap-5">
            <div className="bg-gray-200 h-4 mb-2"></div>
            <div className="bg-gray-200 h-4 w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BreadCrumbSkeleton({ items = 2 }: { items?: number }) {
  return (
    <>
      <div className="flex max-h-3.5 gap-1.5 mb-6 mt-2.5">
        {Array.from({ length: items }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 w-14" aria-hidden="true" />
        ))}
      </div>
      <h2 className="mb-4">
        <Skeleton className="h-9 max-w-[348px]" aria-hidden="true" />
      </h2>
      <div>
        <Skeleton className="h-7 max-w-[320px] w-full" aria-hidden="true" />
      </div>
    </>
  );
}

function FilterSkeleton() {
  return (
    <div className="mb-5">
      <Skeleton className="h-14 w-full" />
    </div>
  );
}

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const sort = resolvedSearchParams.sort || "new";
  return (
    <div className="bg-white relative">
      <div className="container pt-10 !pb-5">
        <Suspense fallback={<BreadCrumbSkeleton />}>
          <ShopHederText slug={slug} />
        </Suspense>
      </div>
      <Suspense fallback={<FilterSkeleton />}>
        <ShopFilter />
      </Suspense>
      <Suspense fallback={<ProductsLoading />}>
        <ProductList slug={slug} sort={sort as string} />
      </Suspense>
    </div>
  );
};

export default page;
