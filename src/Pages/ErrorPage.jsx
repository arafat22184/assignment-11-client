import erroranimation from "../assets/Animations/404Error.json";
import Lottie from "lottie-react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";

const ErrorPage = ({ publicComponent }) => {
  return (
    <div className="bg-slate-950 min-h-svh">
      {publicComponent && (
        <div className="border-b border-blue-400">
          <Navbar></Navbar>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col  justify-center items-center">
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
            to={"/"}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-white font-bold rounded-xl"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
