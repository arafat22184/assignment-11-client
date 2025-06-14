/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiFileText,
  FiTag,
  FiImage,
  FiUploadCloud,
} from "react-icons/fi";
import { MdEmail, MdOutlineCategory, MdPerson } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const categories = [
    "Technology",
    "Health",
    "Travel",
    "Food",
    "Lifestyle",
    "Finance",
    "Education",
    "Environment",
  ];

  const handleAddBlog = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const tags = form.tags.value.split(",").map((tag) => tag.trim());
    const content = form.content.value;
    const wordCount = content.trim().split(/\s+/).length;
    const shortDescription = form.shortDescription.value;

    const blogData = {
      title,
      image,
      shortDescription,
      category,
      content,
      author: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
      createdAt: new Date().toISOString(),
      tags,
      likes: [],
      comments: [],
      wordCount,
    };

    // Send Blog Data to DB
    axiosSecure
      .post(`${import.meta.env.VITE_API_LINK}/blogs`, blogData)
      .then((res) => {
        if (res.data.insertedId) {
          setLoading(false);
          toast.success("Blog posted successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to post blog. Try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="min-h-screen bg-slate-950 text-slate-100 px-4 py-12"
    >
      <div className="max-w-4xl mx-auto border border-slate-800 rounded-xl p-8 shadow-lg bg-slate-900">
        <h2 className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-white mb-4 dmSerif">
          <FiEdit3 /> Create New <span className="text-blue-400">Blog</span>
        </h2>

        <form onSubmit={handleAddBlog} className="space-y-6">
          {/* Title */}
          <div>
            <label className=" mb-1 flex items-center gap-1">
              <FiFileText /> Blog Title
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your awesome blog title..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className=" mb-1 flex items-center gap-1">
              <FiImage /> Image URL
            </label>
            <input
              name="image"
              type="url"
              required
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Category */}
          <div>
            <label className=" mb-1 flex items-center gap-1">
              <MdOutlineCategory />
              Category
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className=" mb-1 flex items-center gap-1">
              <FiTag /> Tags{" "}
              <span className="text-slate-400">(comma-separated)</span>
            </label>
            <input
              name="tags"
              type="text"
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="JavaScript, Design, React"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className=" mb-1 flex items-center gap-1">
              <FiFileText /> Short Description
            </label>
            <textarea
              name="shortDescription"
              rows="3"
              required
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="A brief summary of your blog..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-1 flex items-center gap-1">
              <FiFileText /> Blog Content
            </label>
            <textarea
              name="content"
              rows="8"
              required
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="WWrite your full blog description here…"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 flex items-center gap-1">
                <MdPerson /> Your Name
              </label>
              <input
                name="name"
                type="text"
                readOnly
                defaultValue={user.displayName}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1">
                <MdEmail /> Your Email
              </label>
              <input
                name="email"
                type="email"
                readOnly
                defaultValue={user.email}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors disabled:opacity-50 cursor-pointer"
          >
            <FiUploadCloud />
            {loading ? "Posting..." : "Post Blog"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddBlog;
