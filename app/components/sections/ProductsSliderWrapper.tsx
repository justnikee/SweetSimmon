import ProductsSlider from "./ProductsSlider";

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export default async function ProductsSliderWrapper() {
  //   await sleep(5000);
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/products`,
    { cache: "no-store" }
  );

  const products = await res.json();

  return <ProductsSlider products={products.slice(0, 8)} />;
}
