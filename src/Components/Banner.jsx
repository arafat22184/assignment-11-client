// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation, Pagination, Autoplay } from "swiper/modules";
// // import { motion } from "framer-motion";
// // import { FaArrowRight } from "react-icons/fa";
// // import { Link } from "react-scroll";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";

// // const slides = [
// //   {
// //     id: 1,
// //     image: "https://i.ibb.co/ccJmG7nP/fashion.jpg",
// //     title: "Explore Future Trends in Fashion 2025",
// //     description:
// //       "Stay updated with the latest styles, blogs, and fashion insights from top designers worldwide.",
// //   },
// //   {
// //     id: 2,
// //     image: "https://i.ibb.co/FLQYXHdC/register-BG2.jpg",
// //     title: "Join Our Creative Blogging Space",
// //     description:
// //       "Express your thoughts, share knowledge, and connect with a vibrant community of writers.",
// //   },
// //   {
// //     id: 3,
// //     image: "https://i.ibb.co/pj8r35KZ/login-Page-BG.jpg",
// //     title: "Where Stories Come Alive",
// //     description:
// //       "Blogify helps bring your passions to life through powerful storytelling and beautiful visuals.",
// //   },
// // ];

// // const textVariants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: (i) => ({
// //     opacity: 1,
// //     y: 0,
// //     transition: { delay: i * 0.3, duration: 0.8 },
// //   }),
// // };

// // const Banner = () => {
// //   return (
// //     <section className="relative w-full h-[90vh]" id="banner">
// //       <Swiper
// //         modules={[Navigation, Pagination, Autoplay]}
// //         navigation
// //         pagination={{ clickable: true }}
// //         autoplay={{ delay: 5000 }}
// //         loop
// //         className="w-full h-full"
// //       >
// //         {slides.map((slide, index) => (
// //           <SwiperSlide key={slide.id}>
// //             <div
// //               className="relative w-full h-full bg-cover bg-center"
// //               style={{ backgroundImage: `url(${slide.image})` }}
// //             >
// //               <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-black/60 backdrop-blur-sm"></div>

// //               <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white">
// //                 <motion.h1
// //                   className="text-3xl md:text-5xl font-bold mb-4"
// //                   custom={1}
// //                   initial="hidden"
// //                   animate="visible"
// //                   variants={textVariants}
// //                 >
// //                   {slide.title}
// //                 </motion.h1>

// //                 <motion.p
// //                   className="text-base md:text-xl max-w-2xl mb-6"
// //                   custom={2}
// //                   initial="hidden"
// //                   animate="visible"
// //                   variants={textVariants}
// //                 >
// //                   {slide.description}
// //                 </motion.p>

// //                 <motion.div
// //                   custom={3}
// //                   initial="hidden"
// //                   animate="visible"
// //                   variants={textVariants}
// //                 >
// //                   <Link
// //                     to="join"
// //                     smooth={true}
// //                     duration={700}
// //                     className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/40 hover:shadow-md text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300"
// //                   >
// //                     Join Now <FaArrowRight />
// //                   </Link>
// //                 </motion.div>
// //               </div>
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </section>
// //   );
// // };

// // export default Banner;

// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa";
// import { Link } from "react-scroll";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const slides = [
//   {
//     id: 1,
//     image: "https://i.ibb.co/ccJmG7nP/fashion.jpg",
//     title: "Explore Future Trends in Fashion 2025",
//     description:
//       "Stay updated with the latest styles, blogs, and fashion insights from top designers worldwide.",
//   },
//   {
//     id: 2,
//     image: "https://i.ibb.co/FLQYXHdC/register-BG2.jpg",
//     title: "Join Our Creative Blogging Space",
//     description:
//       "Express your thoughts, share knowledge, and connect with a vibrant community of writers.",
//   },
//   {
//     id: 3,
//     image: "https://i.ibb.co/pj8r35KZ/login-Page-BG.jpg",
//     title: "Where Stories Come Alive",
//     description:
//       "Blogify helps bring your passions to life through powerful storytelling and beautiful visuals.",
//   },
// ];

// const textVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

// const Banner = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section className="relative w-full h-[90vh]" id="banner">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 5000 }}
//         loop
//         className="w-full h-full"
//         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={slide.id}>
//             <div
//               className="relative w-full h-full bg-cover bg-center"
//               style={{ backgroundImage: `url(${slide.image})` }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-black/60 backdrop-blur-sm"></div>

//               <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white">
//                 <AnimatePresence mode="wait">
//                   {activeIndex === index && (
//                     <motion.div
//                       key={slide.id}
//                       initial="hidden"
//                       animate="visible"
//                       exit="hidden"
//                       className="flex flex-col items-center"
//                     >
//                       <motion.h1
//                         variants={textVariants}
//                         className="text-3xl md:text-5xl font-bold mb-4"
//                       >
//                         {slide.title}
//                       </motion.h1>

//                       <motion.p
//                         variants={textVariants}
//                         className="text-base md:text-xl max-w-2xl mb-6"
//                       >
//                         {slide.description}
//                       </motion.p>

//                       <motion.div variants={textVariants}>
//                         <Link
//                           to="join"
//                           smooth={true}
//                           duration={700}
//                           className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/40 hover:shadow-md text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300"
//                         >
//                           Join Now <FaArrowRight />
//                         </Link>
//                       </motion.div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default Banner;
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
      className="relative w-full h-[90vh] md:h-[80vh] sm:h-[70vh] overflow-hidden"
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

              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-black/30 z-10"></div> */}

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
                      <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
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
