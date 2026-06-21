import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "wouter";

// Consistent hero band for sub-pages.
// Optional `eyebrow`, `title` (supports stroke highlight via children),
// optional breadcrumb, optional background image with overlay.
export default function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumb,
  image,
  dark = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string; // last word(s) to render as stroke
  subtitle?: string;
  crumb?: string; // e.g. "Services / Premium Rentals"
  image?: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  const strokeColor = dark ? "rgba(248,245,240,0.28)" : "hsl(14 56% 49%)";
  return (
    <section className={`border-b-[3px] border-foreground relative overflow-hidden ${dark ? "bg-foreground text-card" : "bg-background"}`}>
      {image && (
        <>
          <motion.img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </>
      )}

      {crumb && (
        <div className={`border-b-[3px] ${dark ? "border-card/15" : "border-foreground"} px-5 md:px-10 py-3 relative z-10`}>
          <Link href="/" className={`section-label ${dark ? "text-card/40 hover:text-primary" : "text-muted-foreground hover:text-primary"} transition-colors`}>
            Home
          </Link>
          <span className={`section-label mx-2 ${dark ? "text-card/20" : "text-foreground/20"}`}>/</span>
          <span className={`section-label ${dark ? "text-card/60" : "text-muted-foreground"}`}>{crumb}</span>
        </div>
      )}

      <div className={`px-5 md:px-10 py-12 md:py-20 relative z-10 ${image ? "text-card" : ""}`}>
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`section-label mb-4 ${image || dark ? "text-primary" : "text-muted-foreground"}`}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-sans font-extrabold leading-[0.92] tracking-[-0.04em]"
          style={{ fontSize: "clamp(40px, 7vw, 96px)" }}
        >
          {title}
          {highlight && (
            <>
              <br />
              <span style={{ WebkitTextStroke: `2px ${strokeColor}`, color: "transparent" }}>
                {highlight}
              </span>
            </>
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`font-sans text-base md:text-lg leading-relaxed max-w-xl mt-6 ${image || dark ? "text-card/70" : "text-muted-foreground"}`}
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
