/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-scroll";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/ccJmG7nP/fashion.jpg",
    titles: [
      "Explore the Future of Fashion 2025",
      "Discover Style With Blogify",
      "Your Journey into Trend Begins",
    ],
    description:
      "Stay updated with the latest fashion, blogs, and visual storytelling from creators worldwide.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/KjDbkD88/writing.jpg",
    titles: [
      "Join Our Blogging Revolution",
      "Write. Inspire. Repeat.",
      "Stories That Matter",
    ],
    description:
      "Blogify helps you express, connect, and shine with your words and visuals.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/9khRy2GB/bloger-Meetup.jpg",
    titles: [
      "Where Ideas Find Wings",
      "Blogify: Your Creative Space",
      "Make Your Voice Heard",
    ],
    description:
      "Connect, create, and explore your passion with amazing people around you.",
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="relative w-full xl:max-w-7xl mx-auto h-[60vh] md:h-[60vh] sm:h-[70vh] overflow-hidden rounded-b-2xl"
      id="banner"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 15000 }}
        loop
        className="w-full h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background with motion */}
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    key={slide.image}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                )}
              </AnimatePresence>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 text-white ">
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.8 }}
                      className="flex flex-col items-center p-8 bg-black/60 rounded-2xl"
                    >
                      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 dmSerif">
                        <Typewriter
                          words={slide.titles}
                          loop={0}
                          cursor
                          cursorStyle="|"
                          typeSpeed={70}
                          deleteSpeed={40}
                          delaySpeed={2000}
                        />
                      </h1>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="text-base md:text-xl max-w-2xl mb-6"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                      >
                        <Link
                          to="join"
                          smooth={true}
                          duration={700}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/40 hover:shadow-md text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300"
                        >
                          Join Now <FaArrowRight />
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
