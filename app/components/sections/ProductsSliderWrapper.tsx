import ProductsSlider from "./ProductsSlider";

export default async function ProductsSliderWrapper() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/products`,
    { next: { revalidate: 3600 } }
  );

  const products = await res.json();

  return <ProductsSlider products={products.slice(0, 8)} />;
}
