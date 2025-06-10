import React from "react";
import Banner from "../Components/Banner";
import Newsletter from "../Components/Newsletter";
import OurGallery from "../Components/OurGallery";
import TestimonialsSlider from "../Components/TestimonialsSlider";
import RecentBlogs from "../Components/RecentBlogs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <RecentBlogs></RecentBlogs>
      <OurGallery></OurGallery>
      <TestimonialsSlider></TestimonialsSlider>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
