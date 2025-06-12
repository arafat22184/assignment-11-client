/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  FiHeart,
  FiEdit2,
  FiClock,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { BiLeftArrow } from "react-icons/bi";
import { useLoaderData } from "react-router";
import { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const BlogDetails = () => {
  const { user } = use(AuthContext);
  const blog = useLoaderData();
  const isAuthor = user?.email === blog?.author?.email;
  const canComment = !isAuthor;

  // Format date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-950 min-h-screen py-12 px-4 lg:px-6 text-slate-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          onClick={() => window.history.back()}
        >
          <BiLeftArrow /> Back to blogs
        </button>

        {/* Blog Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full mb-4">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <div className="flex items-center gap-1">
              <FiUser className="text-blue-400" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="text-blue-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiMessageSquare className="text-blue-400" />
              <span>{blog.comments?.length || 0} comments</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <motion.div
          className="rounded-xl overflow-hidden mb-8 border border-slate-700"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto max-h-96 object-cover"
          />
        </motion.div>

        {/* Blog Content */}
        <article
          className="prose prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-12">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
            <FiHeart /> Like ({blog.likes || 0})
          </button>
          {isAuthor && (
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors">
              <FiEdit2 /> Edit Blog
            </button>
          )}
        </div>

        {/* Comments Section */}
        <div className="border-t border-slate-700 pt-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiMessageSquare className="text-blue-400" />
            Comments ({blog.comments?.length || 0})
          </h3>

          {/* Comment Form */}
          {canComment ? (
            <div className="mb-8">
              <textarea
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-slate-500"
                rows="4"
                placeholder="Share your thoughts..."
              />
              <button className="mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                Post Comment
              </button>
            </div>
          ) : (
            <div className="mb-8 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-md text-slate-400">
              You cannot comment on your own blog
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {blog.comments?.length > 0 ? (
              blog.comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                      <FiUser />
                    </div>
                    <div>
                      <h4 className="font-medium">{comment.user}</h4>
                      <p className="text-xs text-slate-400">
                        {new Date(comment.postedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 pl-11">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-6">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetails;
