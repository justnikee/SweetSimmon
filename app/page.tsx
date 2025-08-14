import Banner from "./components/banner";
import PressSplide from "./components/sections/PressSwiper";
import Products from "./components/sections/bestsellers";
import Testimonials from "./components/sections/testimonials";
import ImageWithText from "./components/global/image-with-text";
import CollectionShowcase from "./components/sections/collections-showcase";
import SearchBar from "./components/global/searchBar";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <PressSplide />
      <Products
        heading="BESTSELLERS"
        subheading="Dermatologist-tested and clinically proven formulas with Nordic ingredients"
      />
      <ImageWithText
        heading="CLEAN, GENTLE + RESULTS-DRIVEN"
        subheading="Aevi is made with pure, therapeutic ingredients from Nordic nature. Our performance-driven formulas are clinically tested to ensure efficacy and visible results while still being gentle for sensitive skin."
        imageUrl={`/images/Aevi-Web-Homepage-Square-01.webp`}
        buttonUrl=""
        imagePosition="left"
      />
      <ImageWithText
        heading="FOR SENSITIVE SKIN, BY SENSITIVE SKIN"
        subheading={
          <>
            Aevi is dermatologically tested and suitable for even the most
            sensitive skin. <br />
            Our skincare is expertly formulated to soothe, hydrate, nourish and
            strengthen the skin because we believe building healthy, resilient
            skin is the key to naturally radiant beauty and well-ageing.
          </>
        }
        imageUrl={`/images/Aevi-Web-Homepage-Square-03.webp`}
        buttonUrl=""
        imagePosition="right"
      />
      <Testimonials />
      <Products
        heading="GIFTS, SETS + BUNDLES"
        subheading="Curated edits of bestselling clean beauty"
      />
      <CollectionShowcase />
      <SearchBar />
    </div>
  );
}
