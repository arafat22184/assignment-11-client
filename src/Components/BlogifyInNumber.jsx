/* eslint-disable no-unused-vars */
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FaUserEdit, FaBlog, FaRegComments, FaRegHeart } from "react-icons/fa";

const stats = [
  { id: 1, icon: FaUserEdit, label: "Active Writers", end: 120 },
  { id: 2, icon: FaBlog, label: "Published Blogs", end: 850 },
  { id: 3, icon: FaRegComments, label: "User Comments", end: 3500 },
  { id: 4, icon: FaRegHeart, label: "Wishlist Adds", end: 500 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const BlogifyInNumber = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-auto px-6 sm:px-10 py-20 mt-5 text-white"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-14 dmSerif"
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="text-blue-400">Blogify</span> in Numbers
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            custom={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={cardVariants}
            className="rounded-2xl p-8 shadow-xl bg-gradient-to-br from-slate-800 to-slate-950 hover:shadow-2xl transition duration-300 border border-blue-500/20 flex flex-col items-center text-center"
          >
            <div className="p-4 mb-5 bg-white/10 rounded-full">
              <stat.icon size={28} className="text-blue-400" />
            </div>

            <h3 className="text-4xl font-extrabold text-white mb-2">
              {inView ? (
                <CountUp
                  end={stat.end}
                  duration={2}
                  separator=","
                  redraw={true}
                />
              ) : (
                "0"
              )}
              +
            </h3>

            <p className="text-gray-300 tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogifyInNumber;
