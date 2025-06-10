import { Link, NavLink } from "react-router";

const Navbar = () => {
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
          `bg-blue-500 text-[18px]  py-3 px-6 font-semibold hover:bg-blue-500 hover:text-white rounded border-2 border-blue-500 ${
            isActive ? "text-white" : "bg-white text-blue-500"
          }`
        }
        to={"/login"}
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `bg-blue-500 text-[18px]  py-3 px-6 font-semibold hover:bg-blue-500 hover:text-white rounded border-2 border-blue-500 ${
            isActive ? "text-white" : " bg-white text-blue-500"
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
        className="w-14 h-14 rounded-full border-blue-500 border-4 "
        src={"Photourl"}
        alt="user photo"
      />

      <button className=" text-[18px] text-red-500 py-3 px-7 font-semibold border rounded cursor-pointer hover:bg-red-500 border-red-500 hover:text-white flex items-center gap-2">
        Logout <span className="text-2xl">{/* <MdLogout /> */}</span>
      </button>
    </>
  );

  return (
    <nav className="navbar max-w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-3"
          >
            {links}
            {loginLinks}
          </ul>
        </div>
        <Link className="flex items-center gap-5" to={"/"}>
          <img
            src="https://i.ibb.co/cSqJhKWm/logo-Light.png"
            className="max-w-12"
            alt="Logo"
          />
          <h1 className="text-white font-extrabold text-3xl">Blogify</h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end hidden lg:flex lg:flex-col xl:flex-row gap-2">
        {loginLinks}
      </div>
    </nav>
  );
};

export default Navbar;
