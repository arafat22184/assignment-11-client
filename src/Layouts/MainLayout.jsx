import Navbar from "../Components/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import BackToTopButton from "../Components/BackToTopButton";
import LoadingSpinner from "../Components/LoadingSpinner";

const MainLayout = () => {
  const navigation = useNavigation();
  console.log();

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="border-b border-blue-400">
        <Navbar></Navbar>
      </div>
      {/* Route content or spinner */}
      <div className="min-h-[calc(100vh-408px)]">
        {navigation.state === "loading" ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <Outlet></Outlet>
        )}
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
