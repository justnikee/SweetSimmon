import ProductsSlider from "./ProductsSlider";

const Products = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <section className="flex justify-center py-14">
      <div className="max-w-[1440px] px-2 w-full">
        <div className="mb-8">
          <h2 className="text-4xl leading-10 text-primary mb-2">BESTSELLERS</h2>
          <p className="text-sm leading-4.5">
            Dermatologist-tested and clinically proven formulas with Nordic
            ingredients
          </p>
        </div>
        <ProductsSlider products={products.slice(0, 8)} />
      </div>
    </section>
  );
};

export default Products;
