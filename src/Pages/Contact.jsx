/* eslint-disable no-unused-vars */
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRegPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Contact = () => {
  const { user } = useContext(AuthContext);
  const handleContactForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    toast.success(`Thank you, ${name}. We’ll get back to you shortly.`);
    e.target.reset();
  };

  return (
    <section className="bg-slate-950 text-white py-10 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-white dmSerif">
            Get in <span className="text-blue-400">Touch</span>
          </h2>
          <p className="text-slate-400 text-base">
            We'd love to hear from you! Whether you have a question about
            features, trials, pricing, or anything else—our team is ready to
            help.
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-400 text-xl" />
              <span>123alarafat@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-400 text-xl" />
              <span>+88017471-44726</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-400 text-xl" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 p-8 rounded-lg shadow-lg space-y-6"
          onSubmit={handleContactForm}
        >
          <h3 className="text-2xl font-semibold text-white mb-2">
            Send Us a Message
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              defaultValue={user?.displayName}
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-400 outline-none"
              required={!user}
              readOnly={!!user}
            />
            <input
              type="email"
              defaultValue={user?.email}
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-400 outline-none"
              required={!user}
              readOnly={!!user}
            />
          </div>

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 bg-slate-800 text-white rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            <FaRegPaperPlane />
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
