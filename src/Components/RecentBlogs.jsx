import { useLoaderData } from "react-router";
import BlogCard from "./BlogCard";

const RecentBlogs = () => {
  const blogs = useLoaderData();
  return (
    <div className="my-20 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-14 leading-tight dmSerif text-white">
        Recent <span className="text-blue-400">Blogs</span>
      </h2>

      {/* BLOGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 px-4 xl:px-0">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
