import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-scroll";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/bMzmKNTf/group.jpg",
  },
  {
    id: 2,
    image: "https://i.ibb.co/bMzmKNTf/group.jpg",
  },
  {
    id: 3,
    image: "https://i.ibb.co/bMzmKNTf/group.jpg",
  },
];

const Banner = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden" id="banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <motion.h1
                  className="text-4xl md:text-6xl font-extrabold mb-4"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  Welcome to{" "}
                  <span className="text-blue-400">
                    <Typewriter
                      words={[
                        "HobbyHub",
                        "Your World",
                        "Creativity",
                        "Community",
                      ]}
                      loop={true}
                      cursor
                      cursorStyle="|"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={2000}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl max-w-2xl mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Connect, create, and explore your passion with amazing people
                  around you!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link
                    to="join"
                    smooth={true}
                    duration={800}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold cursor-pointer transition"
                  >
                    Join Now <FaArrowRight />
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
