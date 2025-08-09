/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiFileText,
  FiTag,
  FiUploadCloud,
  FiInfo,
} from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value.trim();
    const imageUrl = form.imageUrl?.value.trim();
    const imageFile = form.imageFile?.files[0];
    const category = form.category.value;
    const tags = form.tags.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const content = form.content.value.trim();
    const shortDescription = form.shortDescription.value.trim();
    const difficulty = form.difficulty.value;
    const metaTitle = form.metaTitle.value.trim();
    const metaDescription = form.metaDescription.value.trim();
    const imageAlt = form.imageAlt.value.trim();

    if (!imageFile && imageUrl && !validateUrl(imageUrl)) {
      toast.error("Please provide a valid image URL.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tags));
    formData.append("content", content);
    formData.append("shortDescription", shortDescription);
    formData.append("difficulty", difficulty);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("imageAlt", imageAlt);
    formData.append("wordCount", content.split(/\s+/).filter(Boolean).length);
    formData.append("authorName", user.displayName);
    formData.append("authorEmail", user.email);
    formData.append("authorPhoto", user.photoURL);

    if (imageFile) formData.append("imageFile", imageFile);
    if (imageUrl) formData.append("imageUrl", imageUrl);

    try {
      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_LINK}/blogs`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.insertedId) {
        toast.success("Blog posted successfully!");
        navigate("/");
      }
    } catch {
      toast.error("Failed to post blog. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <h3 className="col-span-full flex items-center gap-2 text-lg font-semibold text-blue-400">
      <Icon className="text-blue-500" /> {title}
    </h3>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full mx-auto border border-slate-800 rounded-xl p-8 shadow-lg bg-slate-900"
    >
      <h2 className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold mb-8 dmSerif">
        <FiEdit3 /> Create New <span className="text-blue-400">Blog</span>
      </h2>

      <form onSubmit={handleAddBlog} className="grid grid-cols-1 gap-8">
        {/* Section 1: Basic Info */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SectionHeader icon={FiFileText} title="Basic Info" />

          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 flex items-center gap-1">
              <FiFileText /> Blog Title
            </label>
            <input
              id="title"
              name="title"
              required
              className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2"
              placeholder="Your awesome blog title..."
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="mb-1 flex items-center gap-1">
              <MdOutlineCategory /> Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="tags" className="mb-1 flex items-center gap-1">
              <FiTag /> Tags
            </label>
            <input
              id="tags"
              name="tags"
              placeholder="JavaScript, React"
              className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="difficulty"
              className="mb-1 flex items-center gap-1"
            >
              <FiInfo /> Difficulty Level
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2"
            >
              <option value="">Select Difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Section 2: Content */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 space-y-4">
          <SectionHeader icon={FiEdit3} title="Content" />
          <textarea
            name="shortDescription"
            rows="3"
            required
            placeholder="A brief summary..."
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2"
          />

          <div className="relative">
            <textarea
              name="content"
              rows="8"
              required
              placeholder="Write your full blog here..."
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 pr-20"
              onInput={(e) =>
                setWordCount(
                  e.target.value.trim().split(/\s+/).filter(Boolean).length
                )
              }
            />
            <span className="absolute bottom-2 right-3 text-sm text-slate-400">
              {wordCount} words
            </span>
          </div>
        </div>

        {/* Section 3: SEO Settings */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SectionHeader icon={FiInfo} title="SEO Settings" />
          <input
            name="metaTitle"
            placeholder="SEO-friendly title (max 60 chars)"
            className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2"
          />
          <textarea
            name="metaDescription"
            rows="2"
            placeholder="SEO meta description (max 160 chars)"
            className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 placeholder:center"
          />
        </div>

        {/* Section 4: Media */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 space-y-6">
          <SectionHeader icon={FiUploadCloud} title="Media" />
          <input
            name="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2"
          />
          <input
            name="imageAlt"
            placeholder="Describe the image for accessibility"
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2"
          />
          <input
            name="imageFile"
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            className="file:bg-blue-600 file:text-white file:border-none file:px-4 file:py-2 bg-slate-800 border border-slate-700 rounded-md p-2 w-full"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-64 rounded-lg border border-slate-700 shadow-md"
            />
          )}
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="flex px-8 mx-auto items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors disabled:opacity-50"
        >
          <FiUploadCloud />
          {loading ? "Posting..." : "Post Blog"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddBlog;
