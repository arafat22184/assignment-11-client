/* eslint-disable no-unused-vars */
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { FiFileText, FiTag, FiImage, FiUploadCloud } from "react-icons/fi";
import {
  MdEmail,
  MdOutlineCategory,
  MdOutlineUpdate,
  MdPerson,
} from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const UpdateBlog = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { title, image, shortDescription, category, content, tags, _id } = blog;
  useEffect(() => {
    axiosSecure
      .get(`/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch(() => {
        toast.error("Something went wrong please try again", {
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
  }, [axiosSecure, id]);

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

  const handleUpdate = (e) => {
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

    const updateBlog = {
      title,
      image,
      category,
      tags,
      shortDescription,
      content,
      wordCount,
    };

    // Send Blog Data to DB
    axiosSecure
      .put(`${import.meta.env.VITE_API_LINK}/blogs/${_id}`, updateBlog)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Blog updated successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate(`/blog/${_id}`);
          window.scrollTo(0, 0);
        } else {
          toast.error("Update minimum one field then try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Failed to update blog. Try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
          window.scrollTo(0, 0);
        }
      })
      .finally(() => {
        setLoading(false);
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
          <MdOutlineUpdate />
          Update <span className="text-blue-400">Blog</span>
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <div>
            <label className=" mb-1 flex items-center gap-1">
              <FiFileText /> Blog Title
            </label>
            <input
              name="title"
              type="text"
              defaultValue={title}
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
              defaultValue={image}
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
              value={category}
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
              defaultValue={Array.isArray(tags) ? tags.join(", ") : ""}
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
              defaultValue={shortDescription}
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
              defaultValue={content}
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
            {loading ? "Updating..." : "Update Blog"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateBlog;
