import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center gap-5">
      <span className="loading loading-bars loading-xl"></span>
      <span className="loading loading-bars loading-xl"></span>
      <span className="loading loading-bars loading-xl"></span>
      <span className="loading loading-bars loading-xl"></span>
    </div>
  );
};

export default LoadingSpinner;
