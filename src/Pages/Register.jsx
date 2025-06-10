import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import {
  MdEmail,
  MdErrorOutline,
  MdLock,
  MdLogin,
  MdPersonAdd,
} from "react-icons/md";
import { Link, useNavigate } from "react-router";
import registerAnimation from "../assets/Animations/registerAnimation.json";
import { HiPhotograph, HiUser } from "react-icons/hi";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser, updateUser, setUser, location, googleLogIn } =
    useContext(AuthContext);

  const handlePassCheck = (e) => {
    const password = e.target.value;
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    setError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (error) {
      return;
    }

    createUser(email, password)
      .then((result) => {
        navigate(`${location ? location : "/"}`);
        const user = result.user;
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
            toast.success("Account created successfully! Welcome aboard 🎉", {
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
          .catch(() => setUser(user));
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError(
            "This email is already registered. Please log in or use a different email."
          );
        }
        toast.error(
          "Registration failed. Please verify your information and try again!",
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

  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        if (result.user.email) {
          navigate(`${location ? location : "/"}`);

          toast.success("Account created successfully! Welcome aboard 🎉", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Registration failed. Please try again!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

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
        <h2 className="text-3xl font-bold mb-6 text-center text-white dmSerif">
          Register to Blogify
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
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
              onChange={handlePassCheck}
              required
              className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your password"
              autoComplete="true"
            />
          </div>

          {error && (
            <p className="text-red-500 bg-black/50 pl-2 py-1 flex items-center gap-1 rounded-md">
              <MdErrorOutline />
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-md transition duration-300 text-white flex items-center justify-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600"
          >
            <MdPersonAdd /> Register
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
      <div className="hidden xl:block p-12">
        <Lottie
          style={{ maxWidth: "400px" }}
          animationData={registerAnimation}
        ></Lottie>
      </div>
    </div>
  );
};

export default Register;
