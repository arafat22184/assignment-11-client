/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";

const BlogCard = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { image, title, category, shortDescription } = blog;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative max-w-md rounded-xl overflow-hidden shadow-lg bg-slate-800 border border-slate-700 hover:border-blue-400 transition-all duration-300"
      >
        {/* Image with overlay effect */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

          {/* Category badge with animation */}
          <motion.span
            className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            {category}
          </motion.span>
        </div>

        {/* Content area */}
        <div className="p-6 ">
          {/* Animated title */}
          <h3 className="text-xl font-bold text-slate-100 mb-2 line-clamp-2 h-14">
            {title}
          </h3>

          {/* Description with subtle animation */}
          <motion.p
            className="text-slate-400 mb-4 line-clamp-3"
            animate={{
              opacity: isHovered ? 0.9 : 0.7,
            }}
          >
            {shortDescription}
          </motion.p>

          {/* Stats and actions */}
          <div className="flex items-center justify-between mt-6">
            {/* Read More button with animation */}
            <motion.div
              className="mt-4"
              animate={{
                opacity: isHovered ? 1 : 0.9,
              }}
            >
              <motion.a
                href={`/blogs/${blog._id}`}
                className="block w-full px-4 py-2 text-center bg-blue-400 text-slate-900 font-medium rounded-md hover:bg-blue-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Read More
              </motion.a>
            </motion.div>

            {/* Like button with animation */}
            <motion.button
              className="p-2 rounded-full"
              onClick={() => setIsLiked(!isLiked)}
              whileTap={{ scale: 0.9 }}
              data-tooltip-id="like-tooltip"
            >
              <FiHeart
                className={`h-5 w-5 ${
                  isLiked ? "text-red-500 fill-red-500" : "text-slate-400"
                }`}
                animate={{
                  scale: isLiked ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogCard;
