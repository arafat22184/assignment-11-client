/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import { motion } from "framer-motion";
import {
  FiUser,
  FiFileText,
  FiHeart,
  FiMessageSquare,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";
import { MdOutlineCategory, MdEmail } from "react-icons/md";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch user's blog statistics
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["userBlogStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userStats?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch recent blogs
  const { data: recentBlogs, isLoading: isRecentLoading } = useQuery({
    queryKey: ["dashboardRecentBlogs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboardRecentBlogs?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch popular blogs
  const { data: popularBlogs, isLoading: isPopularLoading } = useQuery({
    queryKey: ["popularBlogs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/popularBlogs?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isStatsLoading || isRecentLoading || isPopularLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 text-white mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back,{" "}
          <span className="text-blue-400">{user?.displayName || "User"}</span>!
        </h1>
        <p className="text-slate-400">
          Here's what's happening with your blogs today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Blogs */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-slate-800 p-6 rounded-xl border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 mb-1">Total Blogs</p>
              <h3 className="text-2xl font-bold">{stats?.totalBlogs || 0}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
              <FiFileText size={24} />
            </div>
          </div>
        </motion.div>

        {/* Total Likes */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-slate-800 p-6 rounded-xl border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 mb-1">Total Likes</p>
              <h3 className="text-2xl font-bold">{stats?.totalLikes || 0}</h3>
            </div>
            <div className="p-3 rounded-full bg-red-500/20 text-red-400">
              <FiHeart size={24} />
            </div>
          </div>
        </motion.div>

        {/* Total Comments */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-slate-800 p-6 rounded-xl border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 mb-1">Total Comments</p>
              <h3 className="text-2xl font-bold">
                {stats?.totalComments || 0}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-green-500/20 text-green-400">
              <FiMessageSquare size={24} />
            </div>
          </div>
        </motion.div>

        {/* Most Popular Category */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-slate-800 p-6 rounded-xl border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 mb-1">Top Category</p>
              <h3 className="text-2xl font-bold">
                {stats?.topCategory || "N/A"}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
              <MdOutlineCategory size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* User Profile and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="lg:col-span-1 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiUser /> Profile
          </h2>
          <div className="flex flex-col items-center mb-4">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 mb-4"
            />
            <h3 className="text-xl font-bold">{user?.displayName || "User"}</h3>
            <p className="text-slate-400 flex items-center gap-1">
              <MdEmail /> {user?.email}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-slate-700 pb-2">
              <span className="text-slate-400">Member Since</span>
              <span>
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-700 pb-2">
              <span className="text-slate-400">Last Login</span>
              <span>
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiCalendar /> Recent Blogs
          </h2>
          {recentBlogs?.length > 0 ? (
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-slate-750 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-400">
                        {blog.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiHeart size={14} />
                          {blog.likes?.length || 0} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMessageSquare size={14} />
                          {blog.comments?.length || 0} comments
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400 py-8">
              You haven't posted any blogs yet.
            </div>
          )}
        </div>
      </div>

      {/* Most Popular Blogs Section */}
      <div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FiTrendingUp /> Most Popular Blogs
        </h2>

        {popularBlogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-750 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors overflow-hidden"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-blue-400 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <FiHeart size={14} />
                      {blog.likes?.length || 0} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMessageSquare size={14} />
                      {blog.comments?.length || 0} comments
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-8">
            No popular blogs to display yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
