/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaFilter, FaListUl } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import { motion, useInView } from "framer-motion";
import BlogCard from "../Components/BlogCard";
import { useLoaderData } from "react-router";
import NoBlogs from "../Components/NoBlogs";
import LoadingSpinner from "../Components/LoadingSpinner";

const AllBlogs = () => {
  const initialBlogs = useLoaderData();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [shorting, setShorting] = useState("Default");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hasMounted = useRef(false);
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(initialBlogs.map((blog) => blog.category)),
    ];
    setCategories(uniqueCategories);
  }, [initialBlogs]);

  // Filter and sort
  useEffect(() => {
    let filtered =
      selectedCategory === "All"
        ? [...blogs]
        : blogs.filter((blog) => blog.category === selectedCategory);

    if (shorting === "Ascending") {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    } else if (shorting === "Descending") {
      filtered.sort((a, b) => b.category.localeCompare(a.category));
    }

    setFilteredBlogs(filtered);
  }, [blogs, selectedCategory, shorting]);

  // Search blogs
  const handleSearch = async (e) => {
    e.preventDefault();
    const search = e.target.search.value.trim();

    if (!search) {
      setBlogs(initialBlogs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_LINK}/blogs?search=${search}`
      );
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      error && setBlogs(initialBlogs);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="bg-slate-950 min-h-screen py-10 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 dmSerif">
            All <span className="text-blue-400">Blogs</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Browse through all the amazing blogs shared by our community.
          </p>
        </div>

        {/* Filter Panel */}
        <div
          ref={ref}
          className="lg:sticky lg:top-20 xl:top-[66px] lg:z-30 bg-slate-950/90 backdrop-blur-xl py-4 border-b border-blue-900 shadow-md"
        >
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-end px-4 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-white text-sm px-4 py-2 border border-blue-500 rounded-md hover:bg-blue-500 transition"
            >
              <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters & Search */}
          <div
            className={`flex-col lg:flex lg:flex-row items-center justify-between gap-6 px-4 transition-all duration-300 ${
              showFilters ? "flex" : "hidden lg:flex"
            }`}
          >
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              {/* Category Dropdown */}
              <div className="relative w-full sm:w-60">
                <FaListUl className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="All">All Categories</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="relative w-full sm:w-60">
                <MdOutlineSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                <select
                  value={shorting}
                  onChange={(e) => setShorting(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Default">Sort By Categories</option>
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">Descending</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="w-full lg:max-w-sm flex items-center mt-3 lg:mt-0 rounded-full border border-blue-400 bg-slate-800 shadow-md focus-within:ring-2 focus-within:ring-blue-400 transition"
            >
              <input
                type="text"
                name="search"
                placeholder="Search blogs by title..."
                className="flex-1 px-5 py-2 text-white placeholder-slate-400 bg-transparent rounded-l-full focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-5 py-3 rounded-r-full cursor-pointer"
              >
                <BiSearchAlt className="text-xl" />
              </button>
            </form>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <NoBlogs setBlogs={setBlogs} initialBlogs={initialBlogs} />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 px-4"
            initial={hasMounted.current ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;
