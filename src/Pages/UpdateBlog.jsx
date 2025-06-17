/* eslint-disable no-unused-vars */
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { FiFileText, FiTag, FiImage, FiUploadCloud } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import {
  MdEmail,
  MdOutlineCategory,
  MdOutlineUpdate,
  MdPerson,
} from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { BiLeftArrow } from "react-icons/bi";
import Swal from "sweetalert2";
import ErrorPage from "./ErrorPage";

const UpdateBlog = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { title, image, shortDescription, category, content, tags, _id } = blog;
  const [previewImage, setPreviewImage] = useState(image);
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

  useEffect(() => {
    axiosSecure
      .get(`/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        setError(err);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
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
          toast.error(
            "Oops! Add an image by uploading a file or entering a URL.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
          setLoading(false);
          return;
        }

        try {
          const res = await axiosSecure.put(
            `${import.meta.env.VITE_API_LINK}/blogs/${_id}`,
            formData
          );

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
        } catch (error) {
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
          window.scrollTo(0, 0);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        window.history.back();
      }

      // ✅ Always reset loading
      setLoading(false);
    });
  };

  const handleCancelBtn = () => {
    Swal.fire({
      title: "Do you want to discard the changes?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Changes are not saved", "", "info");
        window.history.back();
      }
    });
  };

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="min-h-screen bg-slate-950 text-slate-100 px-4 py-12"
    >
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center gap-2 text-blue-300 hover:text-blue-400 mb-6 transition-colors cursor-pointer"
          onClick={() => window.history.back()}
        >
          <BiLeftArrow /> Back to Blog Details
        </button>
      </div>
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
                defaultValue={image}
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
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-64 rounded-md border border-slate-700"
              />
            ) : (
              <img
                src={image}
                alt="Preview"
                className="max-h-64 rounded-md border border-slate-700"
              />
            )}
          </div>

          {/* Category */}
          <div>
            <label className=" mb-1 flex items-center gap-1">
              <MdOutlineCategory />
              Category
            </label>
            <select
              name="category"
              defaultValue={category}
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

          <div className="flex flex-col-reverse md:flex-row items-center gap-4 pt-6 border-t border-slate-700 mt-8">
            {/* Discard Changes Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              onClick={handleCancelBtn}
              className="w-full md:w-1/2 flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              <ImCancelCircle />
              Discard Changes
            </motion.button>

            {/* Divider */}
            <div className="hidden md:block h-6 border-l border-slate-500"></div>
            <div className="md:hidden w-full border-t border-slate-600 relative">
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-2 bg-slate-900 text-xs text-gray-400">
                OR
              </span>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full md:w-1/2 flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="animate-spin">
                  <FiUploadCloud />
                </span>
              ) : (
                <FiUploadCloud />
              )}
              <span>{loading ? "Updating..." : "Update Blog"}</span>
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateBlog;
