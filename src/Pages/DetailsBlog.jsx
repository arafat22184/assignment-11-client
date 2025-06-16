/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  FiHeart,
  FiEdit2,
  FiClock,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { BiCommentAdd, BiLeftArrow } from "react-icons/bi";
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorPage from "./ErrorPage";

const DetailsBlog = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [blog, setBlog] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const isAuthor = user?.email === blog?.author?.email;
  const canComment = !isAuthor;

  // Load blog
  useEffect(() => {
    setLoadingBlog(true);
    axiosSecure
      .get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoadingBlog(false));
  }, [id, axiosSecure]);

  // Load comments
  useEffect(() => {
    setLoadingComments(true);
    axiosSecure
      .get(`/comments/${id}`)
      .then((res) => {
        const { success, data } = res.data;
        if (success) setAllComments(data || []);
        else toast.error("Failed to load comments.");
      })
      .catch(() => toast.error("Error loading comments."))
      .finally(() => setLoadingComments(false));
  }, [id, axiosSecure]);

  // Likes
  useEffect(() => {
    if (user && blog?.likes?.length) {
      setIsLiked(blog.likes.includes(user.uid));
    }
    setLikeCount(blog?.likes?.length || 0);
  }, [user, blog]);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleWishlist = () => {
    if (!user?.email) {
      navigate("/login", { state: location.pathname });
      toast.error("Please Login First");
      return;
    }

    const wishListData = { userId: user.uid, blogId: blog._id };

    axiosSecure
      .post(`/wishlists`, wishListData)
      .then((data) => {
        if (data?.data?.added) {
          setIsLiked(true);
          setLikeCount((prev) => prev + 1);
          toast.success("Blog added to wishlist");
        } else if (data?.data?.removed) {
          setIsLiked(false);
          setLikeCount((prev) => prev - 1);
          toast.error("Blog removed from wishlist");
        }
      })
      .catch(() => toast.error("Oops! Something went wrong."));
  };

  const handleComment = (e) => {
    e.preventDefault();
    const text = e.target.comment.value.trim();
    if (!text) {
      toast.warn("Comment cannot be empty");
      return;
    }

    const commentData = {
      text,
      userImage: user.photoURL,
      userName: user.displayName,
      blogId: blog._id,
    };

    axiosSecure
      .post(`comments`, commentData)
      .then((res) => {
        if (res.data.success) {
          setAllComments((prev) => [...prev, commentData]);
          toast.success("Comment posted successfully");
          e.target.reset();
        } else {
          toast.error("Failed to post comment");
        }
      })
      .catch(() => toast.error("Error posting comment"));
  };

  // Final loading check
  if (loadingBlog || loadingComments) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  const { category, author, createdAt, title, content, image, tags, _id } =
    blog;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-950 min-h-screen py-12 px-4 lg:px-6 text-slate-100"
    >
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center gap-2 text-blue-300 hover:text-blue-400 mb-6"
          onClick={() => window.history.back()}
        >
          <BiLeftArrow /> Back to Blogs
        </button>

        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full mb-4">
            {category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <div className="flex items-center gap-1">
              {author?.photo ? (
                <img
                  className="w-7 h-7 border border-blue-400 rounded-full"
                  src={author.photo}
                  alt={`${author.name} photo`}
                />
              ) : (
                <FiUser className="text-blue-400" />
              )}
              <span>{author?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="text-blue-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiMessageSquare className="text-blue-400" />
              <span>{allComments?.length || 0} comments</span>
            </div>
          </div>
        </div>

        <motion.div
          className="rounded-xl overflow-hidden mb-8 border border-slate-700"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-auto max-h-96 object-cover"
          />
        </motion.div>

        <article className="prose prose-invert max-w-none mb-12">
          <ReactMarkdown>{content?.replace(/\\n/g, "\n")}</ReactMarkdown>
        </article>

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 mb-12">
          <button
            onClick={handleWishlist}
            className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
              isLiked
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }  text-white rounded-md transition-colors`}
          >
            <FiHeart
              className={`h-5 w-5 ${
                isLiked ? "text-white fill-white" : "text-white"
              }`}
            />
            {isLiked ? "Wishlisted" : "Wishlist"} ({likeCount})
          </button>

          {isAuthor && (
            <button
              onClick={() => navigate(`/updateBlog/${_id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
            >
              <FiEdit2 /> Edit Blog
            </button>
          )}
        </div>

        <div className="border-t border-slate-700 pt-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiMessageSquare className="text-blue-400" />
            Comments ({allComments?.length || 0})
          </h3>

          {canComment ? (
            <form onSubmit={handleComment} className="mb-8">
              <textarea
                name="comment"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-white"
                rows="4"
                placeholder="Share your thoughts..."
              />
              <button
                type="submit"
                className="mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-2"
              >
                Post Comment <BiCommentAdd size={20} />
              </button>
            </form>
          ) : (
            <div className="mb-8 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-md text-slate-400">
              You cannot comment on your own blog
            </div>
          )}

          <div className="space-y-6">
            {allComments.length > 0 ? (
              allComments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                      {comment.userImage ? (
                        <img
                          className="w-full h-full rounded-full"
                          src={comment.userImage}
                          alt={comment?.userName}
                        />
                      ) : (
                        <FiUser />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{comment.userName}</h4>
                      <p className="text-xs text-slate-400">
                        {new Date(comment?.postedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 pl-11">{comment.text}</p>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-slate-400 text-center py-6"
              >
                No comments yet. Be the first to comment!
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsBlog;
