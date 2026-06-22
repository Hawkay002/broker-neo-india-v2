import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface FillUpTextProps {
  text: string;
  href: string;
  className?: string;
}

export default function FillUpText({ text, href, className = "" }: FillUpTextProps) {
  const [isActive, setIsActive] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const LONG_PRESS_DURATION = 500;

  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);

  const handleTouchStart = () => {
    touchStartTimeRef.current = Date.now();
    touchTimerRef.current = setTimeout(() => setIsActive(true), LONG_PRESS_DURATION);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    if (Date.now() - touchStartTimeRef.current < LONG_PRESS_DURATION) setIsActive(false);
  };

  const handleTouchMove = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    setIsActive(false);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      className={`relative inline-block cursor-pointer overflow-hidden ${className}`}
    >
      <span className="relative z-10 transition-colors duration-300" 
            style={{ color: isActive ? "hsl(36 38% 97%)" : "inherit" }}>
        {text}
      </span>
      <motion.div
        initial={false}
        animate={{ height: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 bg-primary z-0"
        style={{ height: isActive ? "100%" : "0%" }}
      />
    </a>
  );
}
