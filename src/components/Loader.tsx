import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1600;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => setVisible(false), 280);
      }
    }
    requestAnimationFrame(step);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-foreground flex flex-col items-center justify-center"
        >
          {/* Rotating badge — top left */}
          <div className="absolute top-8 left-8 w-12 h-12 rounded-full border-2 border-card/20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="text-center"
            >
              <p className="font-mono font-bold text-card/40 leading-tight" style={{ fontSize: "6px", letterSpacing: "0.15em" }}>
                BRUT<br />MUM
              </p>
            </motion.div>
          </div>

          {/* Center logo */}
          <div className="flex items-center gap-0 mb-14">
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="font-sans font-extrabold text-[34px] md:text-[44px] tracking-[-0.04em] text-card leading-none"
            >
              BRUT
            </motion.span>
            <div className="mx-3 w-[3px] h-7 bg-primary" />
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-mono text-[11px] tracking-[0.32em] font-medium text-card/35 mt-[2px]"
            >
              REALTY
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="w-52 md:w-72 h-[2px] bg-card/10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
            />
          </div>

          {/* Counter */}
          <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-card/25 font-bold tabular-nums">
            {String(progress).padStart(3, "0")}
          </p>

          {/* Decorative corner marks */}
          <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-card/15" />
          <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-card/15" />

          {/* Bottom tagline */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="section-label text-card/20"
            >
              Mumbai's Finest Properties
            </motion.span>
          </div>

          {/* Ticker at very bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
