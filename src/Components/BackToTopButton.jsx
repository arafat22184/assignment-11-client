/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const RocketBackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    setLaunching(true);
    setTimeout(() => {
      scroll.scrollToTop({ duration: 1000, smooth: "easeInOutQuart" });
      setLaunching(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {visible && !launching && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, y: 50 }}
          whileHover={{ scale: 1.2 }}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl hover:from-indigo-600 hover:to-blue-500"
        >
          <FaRocket className="text-xl" />
        </motion.button>
      )}

      {launching && (
        <motion.div
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{
            y: -150,
            opacity: 0,
            scale: 1.2,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl"
        >
          <FaRocket className="text-xl animate-pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RocketBackToTopButton;
