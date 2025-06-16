import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Animations/loading.json";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Lottie
          animationData={loadingAnimation}
          loop
          className="w-full h-auto"
        />
      </div>
      <p className=" text-center text-lg font-semibold  animate-pulse text-slate-300">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingSpinner;
