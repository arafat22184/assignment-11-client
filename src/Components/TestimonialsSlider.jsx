/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import BlogifyLogo from "./BlogifyLogo";

const testimonials = [
  {
    name: "Emily Carter",
    photo: "https://i.pravatar.cc/150?img=47",
    quote:
      "This blog consistently delivers insightful and inspiring content. I love it!",
    rating: 5,
  },
  {
    name: "Liam Johnson",
    photo: "https://i.pravatar.cc/150?img=12",
    quote:
      "The articles are always fresh, deep, and enjoyable. Highly recommended!",
    rating: 4,
  },
  {
    name: "Sophia Lee",
    photo: "https://i.pravatar.cc/150?img=33",
    quote:
      "I’ve learned so much from this site. Clean, informative, and elegant.",
    rating: 5,
  },
  {
    name: "Noah Williams",
    photo: "https://i.pravatar.cc/150?img=21",
    quote:
      "The best blog I've come across in a while. Keep up the amazing work!",
    rating: 5,
  },
];

const AdvancedTestimonialsSlider = () => {
  return (
    <section className="max-w-7xl pb-20 mx-auto bg-slate-950 py-10 px-6 text-white relative">
      <div className="rotate-90 absolute -right-48 top-64 hidden lg:block">
        <BlogifyLogo></BlogifyLogo>
      </div>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-14 leading-tight dmSerif">
          Trusted by <br />
          <span className="text-blue-400">Happy Readers Worldwide</span>
        </h2>

        <Swiper
          modules={[Autoplay, Pagination, EffectCreative]}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          grabCursor={true}
          effect="creative"
          creativeEffect={{
            prev: { shadow: true, translate: ["-120%", 0, -500] },
            next: { shadow: true, translate: ["120%", 0, -500] },
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl h-full flex flex-col justify-center items-center text-center gap-4 border border-blue-500"
              >
                <FaQuoteLeft className="text-blue-400 text-2xl" />
                <p className="italic text-gray-300 text-lg">“{t.quote}”</p>

                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-20 h-20 rounded-full border-4 border-blue-400 object-cover"
                />
                <h4 className="text-xl font-semibold text-blue-300 dmSerif">
                  {t.name}
                </h4>
                <div className="flex gap-1 text-yellow-400">
                  {Array(t.rating)
                    .fill()
                    .map((_, i) => (
                      <BsStarFill key={i} />
                    ))}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default AdvancedTestimonialsSlider;
