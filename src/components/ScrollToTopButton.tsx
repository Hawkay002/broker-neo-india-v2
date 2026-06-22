import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          onClick={scrollUp}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[200] flex flex-col items-center justify-center gap-1 border-[3px] border-foreground bg-background text-foreground w-12 h-12 cursor-pointer group hover:bg-foreground hover:text-background transition-colors duration-150"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <polyline points="3,12 9,5 15,12" />
          </svg>
          <span className="font-mono text-[7px] tracking-[0.1em] leading-none select-none">
            TOP
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
