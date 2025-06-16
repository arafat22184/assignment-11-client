/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import BlogCard from "../Components/BlogCard";
import { useLoaderData } from "react-router";
import debounce from "lodash.debounce";
import NoBlogs from "../Components/NoBlogs";

const AllBlogs = () => {
  const initialBlogs = useLoaderData();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  // Extract unique categories from blogs
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(initialBlogs.map((blog) => blog.category)),
    ];
    setCategories(uniqueCategories);
  }, [initialBlogs]);

  // Filter blogs by category
  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? blogs
        : blogs.filter((blog) => blog.category === selectedCategory);
    setFilteredBlogs(filtered);
  }, [blogs, selectedCategory]);

  // Search on submit
  const handleSearch = async (e) => {
    e.preventDefault();
    const search = e.target.search.value.trim();
    setSearchText(search);

    if (!search) {
      setBlogs(initialBlogs);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_LINK}/blogs?search=${search}`
      );
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Search error:", error);
      setBlogs(initialBlogs);
    }
  };

  // ✅ Debounced search using useRef
  const debounceRef = useRef(
    debounce(async (value) => {
      if (!value.trim()) {
        setBlogs(initialBlogs);
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_LINK}/blogs?search=${value.trim()}`
        );
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Live search error:", error);
        setBlogs(initialBlogs);
      }
    }, 500)
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debounceRef.current(value);
  };

  return (
    <section className="bg-slate-950 min-h-screen py-8 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 dmSerif">
            All <span className="text-blue-400">Blogs</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Browse through all the amazing blogs shared by our community.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Dropdown */}
          <select
            className="w-full lg:w-60 px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="w-full lg:max-w-sm flex items-center rounded-full border border-blue-400 bg-slate-800 shadow-md focus-within:ring-2 focus-within:ring-blue-400 transition"
          >
            <input
              type="text"
              name="search"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search blogs by title..."
              className="flex-1 px-5 py-2 text-white placeholder-slate-400 bg-transparent rounded-l-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-3 rounded-r-full"
            >
              <BiSearchAlt className="text-xl" />
            </button>
          </form>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <NoBlogs
            setSearchText={setSearchText}
            setBlogs={setBlogs}
            initialBlogs={initialBlogs}
          ></NoBlogs>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]"
            initial="hidden"
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
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
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
