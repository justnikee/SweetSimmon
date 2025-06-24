import Banner from "./components/banner";
import Products from "./components/sections/hp-products";
import InfoImageBanner from "./components/sections/info-banner";
import QuoteSection from "./components/sections/quote-section";

export default function Home() {
  return (
    <div className="">
      <Banner/>
      <Products/>
      <InfoImageBanner/>
      <QuoteSection/>
    </div>
  );
}
