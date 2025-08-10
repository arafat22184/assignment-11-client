/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import { FiHome, FiLogOut, FiMenu, FiX, FiMail } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import { FaBlog, FaHeart, FaPlus } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const location = useLocation();

  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <FiHome />,
    },
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <RiDashboardLine />,
    },
    {
      to: "/dashboard/myBlogs",
      label: "My Blogs",
      icon: <FaBlog />,
    },
    {
      to: "/dashboard/addBlog",
      label: "Add Blog",
      icon: <FaPlus />,
    },
    {
      to: "/dashboard/wishlist",
      label: "Wishlist",
      icon: <FaHeart />,
    },
  ];

  const currentPageTitle =
    navLinks.find((link) => link.to === location.pathname)?.label ||
    "Dashboard";

  const UserAvatar = ({ size }) => {
    return (
      <div
        className={`rounded-full bg-slate-800 border-2 ${
          size === "md"
            ? "border-blue-400 w-12 h-12"
            : "border-slate-700 group-hover:border-blue-400 w-16 h-16"
        } overflow-hidden transition-colors`}
      >
        <img
          src={user?.photoURL || "https://i.pravatar.cc/150?img=3"}
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout Succefull");
      })
      .catch((err) => {
        err && toast.error("Something wen't wrongt please try again");
      });
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Mobile/Tablet Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-black/70 lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed z-40 w-72 min-h-screen bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-4 flex flex-col border-b border-slate-800 gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserAvatar size="md" />
                    <div>
                      <h3 className="text-sm font-medium">
                        {user?.displayName || "User"}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <FiMail className="text-xs" />
                        <span className="truncate max-w-[160px]">
                          {user?.email || "user@example.com"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-blue-400"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col p-2 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <NavLink
                    end={link.to === "/dashboard"}
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-sm font-medium ${
                        isActive
                          ? "bg-slate-800 text-blue-400"
                          : "text-slate-300 hover:bg-slate-800"
                      }`
                    }
                  >
                    <span className="text-lg text-slate-400">{link.icon}</span>
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="p-3 border-t border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-blue-400 cursor-pointer"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-20 xl:w-72 min-h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300">
        <div className="flex flex-col justify-center items-center">
          <div className="flex lg:flex-col xl:flex-row justify-center items-center xl:gap-4 rounded-xl min-w-11/12 mt-4">
            <Link to={"/"}>
              <img
                className="w-12 xl:w-14"
                src="https://i.ibb.co/cSqJhKWm/logo-Light.png"
                alt="fitforge logo"
              />
            </Link>
            <Link
              to={"/"}
              className="text-white font-extrabold text-xl xl:text-4xl dmSerif"
            >
              Blogify
            </Link>
          </div>
          <div className="p-2 xl:p-6 flex flex-row items-center border-b border-slate-800 gap-2">
            <Link to="/dashboard" className="group">
              <UserAvatar size="xl" />
            </Link>

            <div className="hidden xl:flex flex-col items-center text-center w-full">
              <h2 className="font-semibold truncate w-full">
                {user?.displayName || "Welcome"}
              </h2>
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-200 w-full justify-center">
                <FiMail className="text-xs" />
                <span className="truncate max-w-[180px]">
                  {user?.email || "user@example.com"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex flex-col p-2 xl:p-4 gap-1 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              end={link.to === "/dashboard"}
              key={link.to}
              to={link.to}
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content={link.label}
              className={({ isActive }) =>
                `flex items-center justify-center xl:justify-start gap-3 px-2 xl:px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? "bg-slate-800 text-blue-400"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              <span className="hidden xl:inline">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={handleLogout}
            data-tooltip-id="sidebar-tooltip"
            data-tooltip-content="Logout"
            className="w-full flex items-center justify-center xl:justify-start gap-3 px-2 xl:px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-blue-400 cursor-pointer"
          >
            <FiLogOut className="text-xl" />
            <span className="hidden xl:inline">Logout</span>
          </button>
        </div>

        <Tooltip
          id="sidebar-tooltip"
          place="right"
          effect="solid"
          className="z-50 !bg-slate-800 !text-white !text-xs !py-1 !px-2 !rounded-md"
          offset={10}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-hidden">
        <header className="bg-slate-900 border-b border-slate-800 py-4 px-4 xl:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-blue-400"
            >
              <FiMenu className="text-xl" />
            </button>
            <h1 className="text-lg xl:text-xl font-semibold text-slate-100">
              {currentPageTitle}
            </h1>
          </div>
        </header>

        <div className="p-4 xl:p-6 h-[calc(100vh-65px)] overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
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
    </div>
  );
};

export default DashboardLayout;
