/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email!");
      return;
    }

    toast.success("🎉 You're now subscribed to our newsletter!");
    e.target.reset();
  };

  return (
    <section
      className="max-w-7xl mx-4 xl:mx-auto relative z-10 px-6 py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-black rounded-lg overflow-hidden shadow-2xl border border-r-purple-600 border-l-blue-500 border-t-blue-500 border-b-purple-600"
      id="newsletter"
    >
      {/* background glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600 opacity-20 blur-3xl rounded-full animate-pulse"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight dmSerif"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Never Miss a Post Again
        </motion.h2>

        <motion.p
          className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Subscribe to get the latest blog updates, features, and community
          insights directly to your inbox.
        </motion.p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center max-w-xl mx-auto gap-3 md:gap-0"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full sm:w-[320px] px-5 py-3 md:rounded-l-full rounded-2xl bg-slate-800 text-white border md:border-y md:border-l border-blue-800 placeholder:text-gray-400 focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 md:border-y md:border-r border border-blue-800 text-white font-semibold md:rounded-r-full rounded-3xl transition-all duration-300 shadow-lg cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
