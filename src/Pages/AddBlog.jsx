/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
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
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

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

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const image = form.imageUrl?.value;
    const imageFile = form.imageFile?.files[0];
    const category = form.category.value;
    const tags = form.tags.value.split(",").map((tag) => tag.trim());
    const content = form.content.value;
    const shortDescription = form.shortDescription.value;
    const wordCount = content.trim().split(/\s+/).length;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tags));
    formData.append("content", content);
    formData.append("shortDescription", shortDescription);
    formData.append("wordCount", wordCount);
    formData.append("authorName", user.displayName);
    formData.append("authorEmail", user.email);
    formData.append("authorPhoto", user.photoURL);

    if (imageFile) {
      formData.append("imageFile", imageFile);
    } else if (image) {
      formData.append("imageUrl", image);
    } else {
      toast.error("Oops! Add an image by uploading a file or entering a URL.", {
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
      return;
    }

    try {
      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_LINK}/blogs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.insertedId) {
        toast.success("Blog posted successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Failed to post blog. Try again.");
    } finally {
      setLoading(false);
    }
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
            <label className="mb-1 flex items-center gap-1 text-white">
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

          {/* PHOTO */}
          <div className="space-y-6 border border-slate-700 p-4 rounded-2xl">
            {/* Image URL */}
            <div className="w-full">
              <label className="flex items-center gap-1 text-white mb-1">
                <FiImage /> Image URL
                <span className="text-slate-400 ml-1">(optional)</span>
              </label>
              <input
                name="imageUrl"
                type="url"
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Centered "or" Divider */}
            <div className="relative flex items-center justify-center">
              <span className="absolute bg-slate-900 px-3 text-blue-500">
                or
              </span>
              <div className="w-full border-t border-slate-500" />
            </div>

            {/* Image File Upload */}
            <div className="w-full">
              <label className="flex items-center gap-1 text-white mb-1">
                <FiUploadCloud /> Upload Image File
                <span className="text-slate-400 ml-1">(optional)</span>
              </label>
              <input
                name="imageFile"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
                className="file:bg-blue-600 file:text-white file:border-none file:mx-4 file:px-4 file:py-2 file:rounded-md bg-slate-800 text-white border border-slate-700 rounded-md py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              />
            </div>
            {/* Optional Image Preview */}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-64 rounded-md border border-slate-700"
              />
            )}
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 flex items-center gap-1 text-white">
              <MdOutlineCategory /> Category
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
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
            <label className="mb-1 flex items-center gap-1 text-white">
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
            <label className="mb-1 flex items-center gap-1 text-white">
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
            <label className="mb-1 flex items-center gap-1 text-white">
              <FiFileText /> Blog Content
            </label>
            <textarea
              name="content"
              rows="8"
              required
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write your full blog description here…"
            />
          </div>

          {/* Author Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 flex items-center gap-1 text-white">
                <MdPerson /> Your Name
              </label>
              <input
                name="name"
                type="text"
                readOnly
                defaultValue={user.displayName}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1 text-white">
                <MdEmail /> Your Email
              </label>
              <input
                name="email"
                type="email"
                readOnly
                defaultValue={user.email}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* Submit */}
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
