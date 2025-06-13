// /* eslint-disable no-unused-vars */
// import { motion } from "framer-motion";
// import {
//   FiHeart,
//   FiEdit2,
//   FiClock,
//   FiUser,
//   FiMessageSquare,
// } from "react-icons/fi";
// import { BiCommentAdd, BiLeftArrow } from "react-icons/bi";
// import { useLoaderData, useNavigate } from "react-router";
// import { use, useEffect, useState } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
// import { toast } from "react-toastify";
// import axios from "axios";

// const BlogDetails = () => {
//   const { user } = use(AuthContext);
//   const {
//     category,
//     author,
//     createdAt,
//     comments,
//     title,
//     content,
//     image,
//     tags,
//     likes,
//     _id,
//   } = useLoaderData();

//   const [allComments, setAllComments] = useState(comments);

//   const navigate = useNavigate();
//   const isAuthor = user?.email === author?.email;
//   const canComment = !isAuthor;

//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(likes?.length || 0);

//   useEffect(() => {
//     if (user && likes?.length) {
//       setIsLiked(likes.includes(user.uid));
//     }
//     setLikeCount(likes?.length);
//   }, [user, likes]);

//   const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const todayDate = new Date().toISOString();

//   // Data Added to Wishlist
//   const handleWishlist = () => {
//     if (!user?.email) {
//       navigate("/login");
//       toast.error("Please Login First", { theme: "colored" });
//       return;
//     }

//     const userId = user.uid;
//     const wishListData = { userId, blogId: _id };

//     axios
//       .post(`${import.meta.env.VITE_API_LINK}/wishlists`, wishListData)
//       .then((data) => {
//         if (data?.data?.added) {
//           setIsLiked(true);
//           setLikeCount((prev) => prev + 1);
//         }
//         if (data?.data?.removed) {
//           setIsLiked(false);
//           setLikeCount((prev) => prev - 1);
//         }
//       })
//       .catch(() => {
//         toast.error("Oops! Something went wrong. Please try again later.", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       });
//   };

//   // CommentPost
//   const handleComment = (e) => {
//     e.preventDefault();
//     const text = e.target.comment.value;
//     const userImage = user.photoURL;
//     const userName = user.displayName;
//     const postedAt = todayDate;
//     const commentData = { text, userImage, userName, postedAt };

//     axios
//       .patch(`${import.meta.env.VITE_API_LINK}/blogs/${_id}`, commentData)
//       .then((res) => {
//         setAllComments([...allComments, commentData]);
//         if (res.data.success) {
//           toast.success("Comment posted successfully", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: false,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//           });
//           e.target.reset();
//         } else {
//           toast.error("Oops! Failed to post comment", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: false,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//           });
//         }
//       })
//       .catch((error) => {
//         if (error) {
//           toast.error("Oops! Error posting comment", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: false,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//           });
//         }
//       });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-slate-950 min-h-screen py-12 px-4 lg:px-6 text-slate-100"
//     >
//       <div className="max-w-4xl mx-auto">
//         <button
//           className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors cursor-pointer"
//           onClick={() => window.history.back()}
//         >
//           <BiLeftArrow /> Back to blogs
//         </button>

//         <div className="mb-8">
//           <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full mb-4">
//             {category}
//           </span>
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
//           <div className="flex items-center gap-4 text-slate-400 text-sm">
//             <div className="flex items-center gap-1">
//               {author.photo ? (
//                 <img
//                   className="w-7 border border-blue-400 rounded-full"
//                   src={author.photo}
//                   alt={`${author.name} photo`}
//                 />
//               ) : (
//                 <FiUser className="text-blue-400" />
//               )}
//               <span>{author.name}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <FiClock className="text-blue-400" />
//               <span>{formattedDate}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <FiMessageSquare className="text-blue-400" />
//               <span>{allComments?.length || 0} comments</span>
//             </div>
//           </div>
//         </div>

//         <motion.div
//           className="rounded-xl overflow-hidden mb-8 border border-slate-700"
//           whileHover={{ scale: 1.01 }}
//           transition={{ duration: 0.3 }}
//         >
//           <img
//             src={image}
//             alt={title}
//             className="w-full h-auto max-h-96 object-cover"
//           />
//         </motion.div>

//         <article
//           className="prose prose-invert max-w-none mb-12"
//           dangerouslySetInnerHTML={{ __html: content }}
//         />

//         {tags?.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-12">
//             {tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}

//         <div className="flex gap-4 mb-12">
//           <button
//             onClick={handleWishlist}
//             className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
//               isLiked
//                 ? "bg-red-500 hover:bg-red-600"
//                 : "bg-blue-500 hover:bg-blue-600"
//             }  text-white rounded-md transition-colors`}
//           >
//             <FiHeart
//               className={`h-5 w-5 ${
//                 isLiked ? "text-white fill-white" : "text-white"
//               }`}
//               animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
//               transition={{ duration: 0.3 }}
//             />
//             {isLiked ? "Liked" : "Like"} ({likeCount})
//           </button>
//           {isAuthor && (
//             <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors cursor-pointer">
//               <FiEdit2 /> Edit Blog
//             </button>
//           )}
//         </div>

//         <div className="border-t border-slate-700 pt-8">
//           <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
//             <FiMessageSquare className="text-blue-400" />
//             Comments ({allComments?.length || 0})
//           </h3>

//           {canComment ? (
//             <form onSubmit={handleComment} className="mb-8">
//               <textarea
//                 name="comment"
//                 className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-slate-500"
//                 rows="4"
//                 placeholder="Share your thoughts..."
//               />
//               <button
//                 type="submit"
//                 className="mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
//               >
//                 Post Comment <BiCommentAdd size={20} />
//               </button>
//             </form>
//           ) : (
//             <div className="mb-8 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-md text-slate-400">
//               You cannot comment on your own blog
//             </div>
//           )}

//           <div className="space-y-6">
//             {allComments?.length > 0 ? (
//               allComments.map((comment, index) => (
//                 <div
//                   key={index}
//                   className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
//                       {comment.userImage ? (
//                         <img
//                           className="w-full rounded-full"
//                           src={comment.userImage}
//                           alt={`${comment?.userName} photo`}
//                         />
//                       ) : (
//                         <FiUser />
//                       )}
//                     </div>
//                     <div>
//                       <h4 className="font-medium">{comment.userName}</h4>
//                       <p className="text-xs text-slate-400">
//                         {new Date(comment.postedAt).toLocaleDateString(
//                           "en-US",
//                           {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           }
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-slate-300 pl-11">{comment.text}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-slate-400 text-center py-6">
//                 No comments yet. Be the first to comment!
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default BlogDetails;

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
import { useLoaderData, useNavigate } from "react-router";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const BlogDetails = () => {
  const { user } = use(AuthContext);
  const {
    category,
    author,
    createdAt,
    comments,
    title,
    content,
    image,
    tags,
    likes,
    _id,
  } = useLoaderData();

  const [allComments, setAllComments] = useState(comments);

  const navigate = useNavigate();
  const isAuthor = user?.email === author?.email;
  const canComment = !isAuthor;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes?.length || 0);

  useEffect(() => {
    if (user && likes?.length) {
      setIsLiked(likes.includes(user.uid));
    }
    setLikeCount(likes?.length);
  }, [user, likes]);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todayDate = new Date().toISOString();

  // Data Added to Wishlist
  const handleWishlist = () => {
    if (!user?.email) {
      navigate("/login");
      toast.error("Please Login First", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const userId = user.uid;
    const wishListData = { userId, blogId: _id };

    axios
      .post(`${import.meta.env.VITE_API_LINK}/wishlists`, wishListData)
      .then((data) => {
        if (data?.data?.added) {
          setIsLiked(true);
          setLikeCount((prev) => prev + 1);
          toast.success("Blog added to wishlist", {
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
        if (data?.data?.removed) {
          setIsLiked(false);
          setLikeCount((prev) => prev - 1);
          toast.error("Blog removed from wishlist", {
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
      .catch(() => {
        toast.error("Oops! Something went wrong. Please try again later.", {
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

  // CommentPost
  const handleComment = (e) => {
    e.preventDefault();
    const text = e.target.comment.value;
    const userImage = user.photoURL;
    const userName = user.displayName;
    const postedAt = todayDate;
    const commentData = { text, userImage, userName, postedAt };

    axios
      .patch(`${import.meta.env.VITE_API_LINK}/blogs/${_id}`, commentData)
      .then((res) => {
        setAllComments([...allComments, commentData]);
        if (res.data.success) {
          toast.success("Comment posted successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          e.target.reset();
        } else {
          toast.error("Oops! Failed to post comment", {
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
          toast.error("Oops! Error posting comment", {
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
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-950 min-h-screen py-12 px-4 lg:px-6 text-slate-100"
    >
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors cursor-pointer"
          onClick={() => window.history.back()}
        >
          <BiLeftArrow /> Back to blogs
        </button>

        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full mb-4">
            {category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <div className="flex items-center gap-1">
              {author.photo ? (
                <img
                  className="w-7 h-7 border border-blue-400 rounded-full"
                  src={author.photo}
                  alt={`${author.name} photo`}
                />
              ) : (
                <FiUser className="text-blue-400" />
              )}
              <span>{author.name}</span>
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
          <ReactMarkdown>{content.replace(/\\n/g, "\n")}</ReactMarkdown>
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
              animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            />
            {isLiked ? "Wishlisted" : "Wishlist"} ({likeCount})
          </button>
          {isAuthor && (
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors cursor-pointer">
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
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-slate-500"
                rows="4"
                placeholder="Share your thoughts..."
              />
              <button
                type="submit"
                className="mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
            {allComments?.length > 0 ? (
              allComments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                      {comment.userImage ? (
                        <img
                          className="w-full rounded-full"
                          src={comment.userImage}
                          alt={`${comment?.userName} photo`}
                        />
                      ) : (
                        <FiUser />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{comment.userName}</h4>
                      <p className="text-xs text-slate-400">
                        {new Date(comment.postedAt).toLocaleDateString(
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
