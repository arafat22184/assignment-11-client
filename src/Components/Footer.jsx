import React from "react";
import {
  FaFacebook,
  FaFacebookF,
  FaGithub,
  FaLink,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdArrowForwardIos, MdContacts } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="relative bg-slate-800 text-white mt-40">
      {/* Better Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-full">
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          class="transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,400 L 0,150 C 86.32535885167468,163.26315789473685 172.65071770334936,176.5263157894737 258,156 C 343.34928229665064,135.4736842105263 427.72248803827745,81.15789473684211 532,80 C 636.2775119617226,78.84210526315789 760.4593301435407,130.84210526315786 873,158 C 985.5406698564593,185.15789473684214 1086.4401913875597,187.47368421052633 1179,182 C 1271.5598086124403,176.52631578947367 1355.77990430622,163.26315789473682 1440,150 L 1440,400 L 0,400 Z"
            stroke="none"
            stroke-width="0"
            fill="#1d293d"
            fill-opacity="1"
            class="transition-all duration-300 ease-in-out delay-150 path-0"
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* About */}
        <div>
          <div className="flex w-12 items-center gap-3 mb-3">
            <img src="https://i.ibb.co/cSqJhKWm/logo-Light.png" alt="logo" />
            <h3 className="text-2xl font-bold">Blogify</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Blogify is your go-to platform for creative blogging, tech tips, and
            thoughtful content for modern readers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FaLink />
            Quick Links
          </h3>
          <ul className="text-gray-400 space-y-3 text-sm">
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <Link
                className="flex items-center gap-1 hover:text-white"
                to={"/"}
              >
                <MdArrowForwardIos className="text-blue-500" />{" "}
                <span>Home</span>
              </Link>
            </li>

            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <Link
                className="flex items-center gap-1 hover:text-white"
                to={"/allBlogs"}
              >
                <MdArrowForwardIos className="text-blue-500" />{" "}
                <span>All Blogs</span>
              </Link>
            </li>

            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <Link
                className="flex items-center gap-1 hover:text-white"
                to={"/addBlog"}
              >
                <MdArrowForwardIos className="text-blue-500" />{" "}
                <span>Add Blog</span>
              </Link>
            </li>

            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <Link
                className="flex items-center gap-1 hover:text-white"
                to={"/featuredBlogs"}
              >
                <MdArrowForwardIos className="text-blue-500" />{" "}
                <span>Featured Blogs</span>
              </Link>
            </li>

            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <Link
                className="flex items-center gap-1 hover:text-white"
                to={"/wishlist"}
              >
                <MdArrowForwardIos className="text-blue-500" />{" "}
                <span>Wishlist</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MdContacts />
            Contact
          </h3>
          <ul className={`text-sm space-y-2 `}>
            <li>Email: support@blogify.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <IoMdPersonAdd /> Follow Us
          </h3>
          <div className={`flex space-x-4 text-xl `}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 p-1 hover:bg-white rounded-sm"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 p-1 hover:bg-white rounded-sm"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 hover:bg-white rounded-sm p-1"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black hover:bg-white  hover:rounded-full p-1"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Blogify — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
