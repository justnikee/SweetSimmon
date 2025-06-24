import Banner from "./components/banner";
import Products from "./components/sections/hp-products";
import InfoImageBanner from "./components/sections/info-banner";

export default function Home() {
  return (
    <div className="">
      <Banner/>
      <Products/>
      <InfoImageBanner/>
    </div>
  );
}
