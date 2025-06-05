import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdLogin, MdPersonAdd } from "react-icons/md";
import { Link } from "react-router";
import registerAnimation from "../assets/Animations/registerAnimation.json";
import { HiPhotograph, HiUser } from "react-icons/hi";

const Register = () => {
  return (
    <div
      className="md:flex md:justify-center md:items-center md:gap-28 px-4 py-16 bg-cover bg-no-repeat bg-center relative"
      style={{
        backgroundImage: `url('https://i.ibb.co/jkVpV1d5/bg-login-Register.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* LOGIN Form */}
      <div className=" md:min-w-xl max-w-xl p-8 rounded-xl shadow-lg  bg-white/5 backdrop-blur-md border border-white/80">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Register to Blogify
        </h2>

        <form className="space-y-4">
          <div>
            <label className={`mb-1 flex items-center gap-2 text-white`}>
              <HiUser className="text-xl" />
              <span>Name</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className={`w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className={`mb-1 flex items-center gap-2 text-white`}>
              <HiPhotograph className="text-xl" />
              <span>Photo URL</span>
            </label>
            <input
              type="url"
              name="photoURL"
              required
              className={`w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-white">
              <MdEmail /> Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-white">
              <MdLock /> Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your password"
              autoComplete="true"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-md transition duration-300 text-white flex items-center justify-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600"
          >
            <MdPersonAdd /> Register
          </button>
        </form>

        <div className="divider text-white font-bold">OR</div>

        <div className="mt-6">
          <button className="w-full flex items-center justify-center gap-2 py-2 font-semibold rounded-md transition duration-300 text-white cursor-pointer bg-white/7 hover:bg-blue-500">
            <div className="bg-white p-1 rounded-full">
              <FcGoogle />
            </div>{" "}
            Register with Google
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-white">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-400 hover:underline flex items-center justify-center gap-1 mt-1"
          >
            <MdLogin /> Login here
          </Link>
        </div>
      </div>

      {/*  animation */}
      <div className="hidden md:block p-12">
        <Lottie
          style={{ maxWidth: "400px" }}
          animationData={registerAnimation}
        ></Lottie>
      </div>
    </div>
  );
};

export default Register;
