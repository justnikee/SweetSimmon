import Banner from "./components/banner";
import PressSplide from "./components/sections/PressSwiper";
import Products from "./components/sections/bestsellers";
import InfoImageBanner from "./components/sections/info-banner";
import QuoteSection from "./components/sections/quote-section";
import VideoBanner from "./components/sections/video-bannner";
import Testimonials from "./components/sections/testimonials";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <PressSplide />
      <Products />
      <InfoImageBanner />
      <QuoteSection />
      <VideoBanner />
      <Testimonials />
    </div>
  );
}
