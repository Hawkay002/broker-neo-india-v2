import { motion } from "framer-motion";
import { Link } from "wouter";
import { BedDouble, Bath, Maximize2 } from "lucide-react";
import { Hero3D } from "@/components/Scene3D";

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100svh] border-b-[3px] border-foreground relative overflow-hidden flex flex-col">
      {/* Top rule */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex items-center justify-between flex-shrink-0 bg-card">
        <span className="section-label text-muted-foreground">Mumbai's Premier Real Estate Agency</span>
        <span className="section-label text-muted-foreground hidden md:block">Est. 2009 · BOM</span>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* ── Left panel — terracotta "THE REAL DEAL" ── */}
        <div className="relative flex flex-col justify-between px-5 md:px-10 py-8 md:py-12 lg:w-[52%] xl:w-[55%] border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-foreground bg-primary text-primary-foreground overflow-hidden">
          {/* 3D accent — full-panel background */}
          <div className="absolute inset-0 pointer-events-none opacity-35">
            <Hero3D className="w-full h-full" />
          </div>

          {/* Faded "MUMBAI" watermark — shifted upward for both desktop and mobile */}
          <span
            aria-hidden
            className="watermark absolute bottom-8 md:bottom-14 left-0 right-0 text-center select-none"
            style={{ fontSize: "clamp(110px, 22vw, 200px)" }}
          >
            MUMBAI
          </span>

          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
            {/* Stamp */}
            <motion.div variants={fadeUp} className="mb-6 inline-flex">
              <div className="stamp w-14 h-14 md:w-16 md:h-16 rounded-full border-[3px] border-primary-foreground flex flex-col items-center justify-center">
                <p className="font-mono font-bold text-primary-foreground leading-tight text-center" style={{ fontSize: "8px", letterSpacing: "0.18em" }}>
                  BRUT<br />MUM
                </p>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              className="font-sans font-extrabold leading-[0.88] tracking-[-0.04em] mb-6"
              style={{ fontSize: "clamp(52px, 11vw, 130px)" }}
            >
              THE<br />
              <span style={{ WebkitTextStroke: "2.5px rgba(248,245,240,0.85)", color: "transparent" }}>REAL</span><br />
              DEAL.
            </motion.h1>

            {/* Sub-copy */}
            <motion.p variants={fadeUp} className="font-sans text-base md:text-lg text-primary-foreground/85 max-w-md mb-8 leading-relaxed">
              Mumbai's most direct real estate firm. Premium properties in Worli, Bandra, Juhu, and Malabar Hill — no fluff, just results.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10 md:mb-0">
              <a
                href="#listings"
                className="btn-fill-dark-on-light bg-primary-foreground text-foreground px-6 py-3.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2"
              >
                See Listings <span className="text-primary">↗</span>
              </a>
              <a
                href="#brokers"
                className="btn-fill-primary-on-dark bg-transparent text-primary-foreground px-6 py-3.5 font-bold border-2 border-primary-foreground/40 uppercase tracking-widest text-xs cursor-pointer inline-block"
              >
                Meet the Team
              </a>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="relative z-10 flex gap-6 md:gap-10 border-t-[2px] border-primary-foreground/20 pt-6 mt-6"
          >
            {[
              { value: "500+", label: "Properties Sold" },
              { value: "₹2,400 Cr+", label: "Total Volume" },
              { value: "98%", label: "Satisfied Clients" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-sans font-extrabold text-xl md:text-2xl tracking-tight">{s.value}</p>
                <p className="section-label text-primary-foreground/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right panel — hero image ── */}
        <div className="lg:flex-1 relative min-h-[320px] lg:min-h-0 overflow-hidden">
          {/* Black vertical bar (left edge of right panel) for the side label — runs top to bottom */}
          <div className="vbar-dark absolute left-0 top-0 bottom-0 w-[44px] hidden lg:flex items-center justify-center z-20">
            <div className="flex items-center gap-1.5" style={{ writingMode: "vertical-rl" }}>
              <div className="w-px h-10 bg-card/30" />
              <span className="font-mono text-[10px] text-card/60 tracking-[0.25em] uppercase">Mumbai's Finest Residences</span>
            </div>
          </div>

          <motion.img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=85"
            alt="Luxury Mumbai penthouse interior"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />

          {/* Featured listing card — cleared from vbar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-[56px] md:right-8 bg-foreground text-card p-4 md:p-5 border-2 border-primary"
          >
            <p className="section-label text-primary mb-1.5">Featured Listing</p>
            <p className="font-sans font-bold text-lg leading-tight mb-1">The Worli Sea Face Penthouse</p>
            <p className="font-mono text-xs text-card/50 mb-3">Worli, Mumbai</p>
            <div className="flex items-center gap-3 font-mono text-[11px] text-card/60 mb-3">
              <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-primary" />4 Bed</span>
              <span className="text-card/20">·</span>
              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-primary" />4.5 Bath</span>
              <span className="text-card/20">·</span>
              <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-primary" />4,200 sq.ft.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-lg text-primary">₹8,50,000<span className="text-card/40 font-normal text-xs">/mo</span></span>
              <Link
                to="/listings/worli-sea-face-penthouse"
                className="btn-fill-dark font-mono text-[10px] uppercase tracking-[0.2em] font-bold bg-primary text-primary-foreground px-3 py-1.5 border border-primary-foreground/20 cursor-pointer inline-block"
              >
                View →
              </Link>
            </div>
          </motion.div>

          {/* Corner marker */}
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-card/30 hidden md:block z-10" />
        </div>
      </div>
    </section>
  );
}
