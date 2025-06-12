/* eslint-disable no-unused-vars */
import { useLoaderData, Link } from "react-router";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const RecentBlogs = () => {
  const blogs = useLoaderData();

  return (
    <section className="relative py-20 px-4 md:px-6 xl:px-0 bg-slate-950 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white dmSerif">
          Recent <span className="text-blue-400">Blogs</span>
        </h2>
        <p className="mt-2 text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Stay up to date with our latest thoughts, ideas, and insights from the
          blog.
        </p>
      </motion.div>

      {/* Blog Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.3,
            },
          },
        }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto"
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1 }}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          to="/allBlogs"
          className="flex justify-center items-center gap-1 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 transition duration-300 shadow hover:shadow-lg"
        >
          View All Blogs <MdOutlineKeyboardDoubleArrowRight size={25} />
        </Link>
      </motion.div>
    </section>
  );
};

export default RecentBlogs;
