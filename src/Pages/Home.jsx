import React from "react";
import Banner from "../Components/Banner";
import Newsletter from "../Components/Newsletter";
import OurGallery from "../Components/OurGallery";
import TestimonialsSlider from "../Components/TestimonialsSlider";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OurGallery></OurGallery>
      <TestimonialsSlider></TestimonialsSlider>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
