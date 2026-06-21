import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Shared scroll-reveal wrappers used across home sections + pages.
// Keeps reveal vocabulary consistent everywhere.

const variants: Record<"up" | "left" | "right" | "scale", Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } },
};

type Direction = keyof typeof variants;

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

// Stagger container — children should be <Reveal> or motion.* with variants.
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const fadeUp = variants.up;
