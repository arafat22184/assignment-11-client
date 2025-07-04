import React, { useEffect } from "react";
import Banner from "../Components/Banner";
import Newsletter from "../Components/Newsletter";
import OurGallery from "../Components/OurGallery";
import TestimonialsSlider from "../Components/TestimonialsSlider";
import RecentBlogs from "../Components/RecentBlogs";
import BlogifyInNumber from "../Components/BlogifyInNumber";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner></Banner>
      <RecentBlogs></RecentBlogs>
      <OurGallery></OurGallery>
      <TestimonialsSlider></TestimonialsSlider>
      <BlogifyInNumber></BlogifyInNumber>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
