import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdLogin, MdPersonAdd } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import loginAnimation from "../assets/Animations/loginAnimation.json";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { signInUser, setLocation, googleLogIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLocation(location.state);
  }, [location.state, setLocation]);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then(() => {
        navigate(location.state ? location.state : "/");
        toast.success("Sign in successfully", {
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
        toast.error("Email or Password Invalid", {
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

  const handleGoogleLogin = () => {
    googleLogIn()
      .then(() => {
        navigate(location.state ? location.state : "/");
        toast.success("Sign in successfully with Google", {
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
        toast.error(
          "Oops! Something went wrong with Google sign-in. Please try again later.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
  };

  return (
    <div
      className="md:flex md:justify-center md:items-center md:gap-28 px-4 py-24 bg-cover bg-no-repeat bg-center relative"
      style={{
        backgroundImage: `url('https://i.ibb.co/jkVpV1d5/bg-login-Register.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* LOGIN Form */}
      <div className=" md:min-w-xl max-w-xl p-8 rounded-xl shadow-lg  bg-white/5 backdrop-blur-md border border-white/80">
        <h2 className="text-3xl font-bold mb-6 text-center text-white dmSerif">
          Login to Blogify
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
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
            <MdLogin /> Login
          </button>
        </form>

        <div className="divider text-white font-bold">OR</div>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2 font-semibold rounded-md transition duration-300 text-white cursor-pointer bg-white/7 hover:bg-blue-500"
          >
            <div className="bg-white p-1 rounded-full">
              <FcGoogle />
            </div>{" "}
            Login with Google
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-white">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-400 hover:underline flex items-center justify-center gap-1 mt-1"
          >
            <MdPersonAdd /> Register here
          </Link>
        </div>
      </div>

      {/* Right side image or animation */}
      <div className="hidden xl:block p-12">
        <Lottie
          style={{ maxWidth: "400px" }}
          animationData={loginAnimation}
        ></Lottie>
      </div>
    </div>
  );
};

export default Login;
