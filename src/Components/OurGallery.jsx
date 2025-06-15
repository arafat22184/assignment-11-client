/* eslint-disable no-unused-vars */
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const images = [
  "https://i.ibb.co/FkcWHYKG/Astronaut.jpg",
  "https://i.ibb.co/KxTw5Vvn/Attractive-Slim-Women.jpg",
  "https://i.ibb.co/pBLBX38g/SeaView.jpg",
  "https://i.ibb.co/cK6FVGcq/women-Writing.jpg",
  "https://i.ibb.co/Fb0XZMRG/food.jpg",
  "https://i.ibb.co/Z6CgZVNg/2-Women-Restaurant.jpg",
  "https://i.ibb.co/G4Qc0dvD/couple-Kitchen.jpg",
  "https://i.ibb.co/n838pWH8/practicing-selfcare.jpg",
  "https://i.ibb.co/2Jpp2Tz/women-Meditation.jpg",
  "https://i.ibb.co/HLqGvWmY/young-Couple.jpg",
  "https://i.ibb.co/DZBrYYK/skinCare.jpg",
];

const OurGallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className="relative bg-slate-950 py-20 px-4 text-white"
      id="gallery"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Sticky Title */}
        <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-lg py-4 dmSerif">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent pb-4">
              <Typewriter
                words={["Our", "Unforgettable", "Gallery"]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
              Discover a visual journey through lifestyle, food, fitness, and
              joy.
            </p>
          </motion.div>
        </div>

        {/* Masonry Image Grid */}
        <PhotoProvider>
          <div className="mt-10 columns-1 sm:columns-2 md:columns-3 gap-4">
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="mb-4 break-inside-avoid"
              >
                <PhotoView src={src}>
                  <img
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full rounded-xl transition-all duration-300 hover:opacity-70 cursor-zoom-in"
                  />
                </PhotoView>
              </motion.div>
            ))}
          </div>
        </PhotoProvider>
      </div>

      <div className="flex justify-center my-5">
        <button className="bg-blue-600 hover:bg-blue-700 py-3 px-8 font-bold rounded-2xl flex items-center justify-center gap-1 cursor-pointer">
          See More
          <MdOutlineKeyboardDoubleArrowRight size={25} />
        </button>
      </div>
    </section>
  );
};

export default OurGallery;
