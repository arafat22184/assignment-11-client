import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar></Navbar>
      <div className="max-w-11/12 mx-auto min-h-[calc(100vh-408px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
