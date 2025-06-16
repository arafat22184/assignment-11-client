import Lottie from "lottie-react";
import noBlogs from "../assets/Animations/noBlogs.json";
import { RiResetRightFill } from "react-icons/ri";

const NoBlogs = ({ setSearchText, setBlogs, initialBlogs }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Lottie
        animationData={noBlogs}
        loop
        style={{ maxWidth: "350px", width: "100%" }}
      />
      <h2 className="text-3xl font-semibold text-red-400 text-center">
        Oops! No blogs matched your search.
      </h2>
      <p className="text-slate-400 text-center max-w-md">
        Try adjusting your filters or search terms. We couldn't find any blog
        posts that match your query.
      </p>

      <button
        onClick={() => {
          setSearchText("");
          setBlogs(initialBlogs);
        }}
        className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition cursor-pointer"
      >
        <RiResetRightFill />
        Reset Search
      </button>
    </div>
  );
};

export default NoBlogs;
