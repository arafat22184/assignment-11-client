import erroranimation from "../assets/Animations/404Error.json";
import Lottie from "lottie-react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = ({ publicComponent }) => {
  return (
    <div className="bg-slate-950 min-h-svh">
      {publicComponent && (
        <div className="border-b border-blue-400">
          <Navbar></Navbar>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div>
            <Lottie
              style={{ maxWidth: "450px" }}
              animationData={erroranimation}
            ></Lottie>
          </div>
          <p className="mb-4 text-center text-white text-3xl">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
