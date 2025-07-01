import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign out Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch(() => {
        toast.error("Oops! Something went wrong. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          `hover:bg-blue-500 text-[18px] text-white hover:text-white py-3 px-7 font-semibold rounded ${
            isActive ? "border-b-4 rounded-none border-blue-500" : ""
          }`
        }
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `hover:bg-blue-500 text-[18px] text-white hover:text-white py-3 px-7 font-semibold rounded ${
            isActive ? "border-b-4 rounded-none border-blue-500" : ""
          }`
        }
        to={"/allBlogs"}
      >
        All Blogs
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `hover:bg-blue-500 text-[18px] text-white hover:text-white py-3 px-7 font-semibold rounded ${
            isActive ? "border-b-4 rounded-none border-blue-500" : ""
          }`
        }
        to={"/addBlog"}
      >
        Add Blog
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `hover:bg-blue-500 text-[18px] text-white hover:text-white py-3 px-7 font-semibold rounded ${
            isActive ? "border-b-4 rounded-none border-blue-500" : ""
          }`
        }
        to={"/featuredBlogs"}
      >
        Featured Blogs
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `hover:bg-blue-500 text-[18px] text-white hover:text-white py-3 px-7 font-semibold rounded ${
            isActive ? "border-b-4 rounded-none border-blue-500" : ""
          }`
        }
        to={"/wishlist"}
      >
        Wishlist
      </NavLink>
    </>
  );

  const loginLinks = (
    <>
      <NavLink
        className={({ isActive }) =>
          `bg-blue-500 text-[18px] py-3 px-6 font-semibold hover:bg-blue-500 hover:text-white rounded border-2 border-blue-500 ${
            isActive ? "text-white" : "bg-white text-blue-500"
          }`
        }
        to={"/login"}
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `bg-blue-500 text-[18px] py-3 px-6 font-semibold hover:bg-blue-500 hover:text-white rounded border-2 border-blue-500 ${
            isActive ? "text-white" : "bg-white text-blue-500"
          }`
        }
        to={"/register"}
      >
        Register
      </NavLink>
    </>
  );

  const logOutBtn = (
    <>
      <img
        referrerPolicy="no-referrer"
        className="w-14 h-14 rounded-full border-blue-500 border-4"
        src={user?.photoURL}
        alt="user"
      />
      <button
        onClick={handleSignOut}
        className="text-[18px] text-red-500 py-2 px-4 font-semibold border rounded cursor-pointer hover:bg-red-500 border-red-500 hover:text-white flex items-center gap-2"
      >
        Logout{" "}
        <span className="text-2xl">
          <MdLogout />
        </span>
      </button>
    </>
  );

  return (
    <nav className="navbar p-4 xl:py-2 xl:p-0 xl:max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown space-x-3">
          <div tabIndex={0} role="button" className="text-white lg:hidden">
            <RiMenu2Fill size={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-950 rounded-box z-10 mt-3 w-52 p-2 shadow space-y-3"
          >
            {links}
            {user ? (
              <div className="flex flex-col items-center gap-2">
                {logOutBtn}
              </div>
            ) : (
              loginLinks
            )}
          </ul>
        </div>
        <Link className="flex items-center gap-5" to={"/"}>
          <img
            src="https://i.ibb.co/cSqJhKWm/logo-Light.png"
            className="max-w-12"
            alt="Logo"
          />
          <h1 className="text-white font-extrabold text-3xl dmSerif">
            Blogify
          </h1>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {user ? (
        <div className="navbar-end hidden lg:flex lg:flex-col xl:flex-row gap-3">
          {logOutBtn}
        </div>
      ) : (
        <div className="navbar-end hidden lg:flex lg:flex-col xl:flex-row gap-2">
          {loginLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
