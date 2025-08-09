import { use, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import {
  FaHome,
  FaBlog,
  FaPlus,
  FaStar,
  FaHeart,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Signed out", {
          position: "top-right",
          autoClose: 4000,
          theme: "colored",
        });
      })
      .catch(() => {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 4000,
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 text-white text-xs xl:text-sm px-3 xl:px-4 py-2 rounded hover:bg-blue-600 transition font-medium ${
              isActive ? "bg-blue-700" : ""
            }`
          }
          to="/"
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 text-white text-xs xl:text-sm px-3 xl:px-4 py-2 rounded hover:bg-blue-600 transition font-medium ${
              isActive ? "bg-blue-700" : ""
            }`
          }
          to="/allBlogs"
        >
          <FaBlog /> All Blogs
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 text-white text-xs xl:text-sm px-3 xl:px-4 py-2 rounded hover:bg-blue-600 transition font-medium ${
                isActive ? "bg-blue-700" : ""
              }`
            }
            to="/dashboard"
          >
            <AiFillDashboard />
            Dashboard
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 text-white text-xs xl:text-sm px-3 xl:px-4 py-2 rounded hover:bg-blue-600 transition font-medium ${
                isActive ? "bg-blue-700" : ""
              }`
            }
            to="/addBlog"
          >
            <FaPlus /> Add Blog
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 text-white text-xs xl:text-sm px-3 xl:px-4 py-2 rounded hover:bg-blue-600 transition font-medium ${
              isActive ? "bg-blue-700" : ""
            }`
          }
          to="/featuredBlogs"
        >
          <FaStar /> Featured Blogs
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 text-white text-xs xl:text-sm px-3 xl:px-4 py-2 rounded hover:bg-blue-600 transition font-medium ${
                isActive ? "bg-blue-700" : ""
              }`
            }
            to="/wishlist"
          >
            <FaHeart /> Wishlist
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 text-white text-xs xl:text-sm px-3 xl:px-4 py-2 rounded hover:bg-blue-600 transition font-medium ${
              isActive ? "bg-blue-700" : ""
            }`
          }
          to="/contact"
        >
          <FaEnvelope /> Contact Us
        </NavLink>
      </li>
    </>
  );

  const loginLinks = (
    <>
      <NavLink
        className={({ isActive }) =>
          `text-xs xl:text-sm font-semibold py-2 px-3 xl:px-4 border rounded transition ${
            isActive
              ? "bg-blue-500 text-white"
              : "border-blue-500 text-white hover:bg-blue-500 hover:text-white"
          }`
        }
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `text-xs xl:text-sm font-semibold py-2 px-3 xl:px-4 border rounded transition ${
            isActive
              ? "bg-blue-500 text-white"
              : "border-blue-500 text-white hover:bg-blue-500 hover:text-white"
          }`
        }
        to="/register"
      >
        Register
      </NavLink>
    </>
  );

  return (
    <nav className="navbar p-3 md:px-5 xl:px-0 max-w-screen-xl mx-auto relative justify-between">
      {/* Start */}
      <div className="navbar-start">
        <div className="dropdown space-x-3">
          <div tabIndex={0} role="button" className="text-white lg:hidden">
            <RiMenu2Fill size={24} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-950 rounded-box z-20 mt-3 w-52 p-2 shadow space-y-1"
          >
            {links}
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-red-500 font-semibold flex items-center gap-2 hover:bg-red-500 hover:text-white p-2 rounded"
              >
                <MdLogout /> Logout
              </button>
            ) : (
              loginLinks
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link className="flex items-center gap-3" to="/">
          <img
            src="https://i.ibb.co/cSqJhKWm/logo-Light.png"
            className="w-10 h-10"
            alt="Logo"
          />
          <h1 className="text-white font-extrabold text-2xl dmSerif">
            Blogify
          </h1>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex flex-wrap items-center gap-1 lg:gap-2 xl:gap-4">
          {links}
        </ul>
      </div>

      {/* End */}
      <div
        className="navbar-end hidden lg:flex relative min-w-[100px]"
        ref={profileRef}
      >
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative cursor-pointer"
            >
              <img
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border-blue-500 border-2"
                src={user?.photoURL}
                alt="user"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-md shadow-md z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-700 text-sm text-white">
                  <span className="block">{user.displayName || "User"}</span>
                  <span className="block text-slate-400 truncate">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition cursor-pointer"
                >
                  <MdLogout /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">{loginLinks}</div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
