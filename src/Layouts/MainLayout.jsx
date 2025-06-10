import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import BackToTopButton from "../Components/BackToTopButton";

const MainLayout = () => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-408px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BackToTopButton></BackToTopButton>
    </div>
  );
};

export default MainLayout;
