/* eslint-disable no-unused-vars */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import LoadingSpinner from "../Components/LoadingSpinner";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Wishlist = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user, loading } = useContext(AuthContext);
  const [hoveredCard, setHoveredCard] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    data: wishlist = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    enabled: !!user?.uid,
    queryKey: ["wishlist", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlistedBlogs?userId=${user?.uid}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (blogId) => {
      const res = await axiosSecure.post(`/wishlists`, {
        userId: user?.uid,
        blogId,
      });

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to remove");
      }

      return res.data;
    },
    onSuccess: () => {
      toast.error("Removed from wishlist", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      queryClient.invalidateQueries(["wishlist", user?.uid]);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  if (loading || isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-red-500 p-6 text-center">Error: {error.message}</div>
    );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-white mx-auto">
      {/* Section Header */}
      <div className="mb-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 dmSerif">
          My <span className="text-blue-400">Wishlists</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          View and manage your favorite blogs in one place. Easily revisit or
          remove blogs you've wishlisted.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center text-slate-400 text-lg">
          Your wishlist is empty. Start saving your favorite blogs!
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredCard(blog._id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="rounded-xl p-4 flex flex-col justify-between bg-slate-800 hover:bg-slate-750 transition-colors duration-300"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: hoveredCard === blog._id ? 1.05 : 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-400 mb-1 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-400 mb-1">
                  Category: {blog.category}
                </p>
                <p className="text-xs text-slate-500 mb-1">
                  Author: {blog.author?.name || "Unknown"}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Published:{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex justify-between gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors duration-200 cursor-pointer"
                >
                  <FaEye />
                  Details
                </button>
                <button
                  onClick={() => mutation.mutate(blog._id)}
                  disabled={mutation.isLoading}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {mutation.isLoading ? (
                    "Removing..."
                  ) : (
                    <>
                      <FiHeart className="fill-white" />
                      Remove
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
