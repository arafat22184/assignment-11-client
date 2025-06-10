/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import { motion, useAnimation } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Animate up/down bounce effect
  useEffect(() => {
    if (visible && !clicked) {
      controls.start({
        y: [0, -6, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      controls.stop();
    }
  }, [visible, clicked, controls]);

  const scrollToTop = () => {
    setClicked(true);
    setTimeout(() => {
      scroll.scrollToTop({ duration: 400, smooth: "easeInOutQuad" });
      setClicked(false);
    }, 600);
  };

  return (
    <>
      <motion.button
        onClick={scrollToTop}
        data-tooltip-id="backToTopTooltip"
        aria-label="Back to top"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 50,
          transition: { duration: 0.4 },
        }}
        exit={{ opacity: 0, y: 50 }}
        whileHover={{ scale: 1.1 }}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer ${
          !visible && "pointer-events-none"
        }`}
      >
        <motion.div
          animate={
            clicked
              ? {
                  y: -80,
                  opacity: 0,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }
              : controls
          }
        >
          <FaArrowUp className="text-lg" />
        </motion.div>
      </motion.button>

      <Tooltip id="backToTopTooltip" content="Back to Top" place="left" />
    </>
  );
};

export default BackToTopButton;
