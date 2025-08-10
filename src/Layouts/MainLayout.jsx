import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import BackToTopButton from "../Components/BackToTopButton";

const MainLayout = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-slate-950 border-b border-blue-500">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="min-h-[calc(100vh-408px)]">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast notifications */}
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

      {/* Back to top button */}
      <BackToTopButton />
    </div>
  );
};

export default MainLayout;
