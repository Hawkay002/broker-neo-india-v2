import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100svh] bg-background border-b-[3px] border-foreground relative overflow-hidden flex flex-col">
      {/* Top rule */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex items-center justify-between flex-shrink-0">
        <span className="section-label text-muted-foreground">Mumbai's Premier Real Estate Agency</span>
        <span className="section-label text-muted-foreground hidden md:block">Est. 2009 · BOM</span>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* ── Left panel ── */}
        <div className="flex flex-col justify-between px-5 md:px-10 py-8 md:py-12 lg:w-[52%] xl:w-[55%] border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-foreground">
          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* Stamp */}
            <motion.div variants={fadeUp} className="mb-6 inline-flex">
              <div className="stamp w-14 h-14 md:w-16 md:h-16 rounded-full border-[3px] border-primary flex flex-col items-center justify-center">
                <p className="font-mono font-bold text-primary leading-tight text-center" style={{ fontSize: "8px", letterSpacing: "0.18em" }}>
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
              <span className="stroke">REAL</span><br />
              DEAL.
            </motion.h1>

            {/* Sub-copy */}
            <motion.p variants={fadeUp} className="font-sans text-base md:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Mumbai's most direct real estate firm. Premium properties in Worli, Bandra, Juhu, and Malabar Hill — no fluff, just results.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10 md:mb-0">
              <a
                href="#listings"
                className="btn-fill-primary-on-dark bg-foreground text-card px-6 py-3.5 font-bold border-2 border-foreground bs bs-cream-hover uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2"
              >
                See Listings <span className="text-primary">↗</span>
              </a>
              <a
                href="#brokers"
                className="btn-fill-primary bg-transparent text-foreground px-6 py-3.5 font-bold border-2 border-foreground/40 uppercase tracking-widest text-xs cursor-pointer inline-block"
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
            className="flex gap-6 md:gap-10 border-t-[2px] border-foreground/20 pt-6 mt-6"
          >
            {[
              { value: "500+", label: "Properties Sold" },
              { value: "₹2,400 Cr+", label: "Total Volume" },
              { value: "98%", label: "Satisfied Clients" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-sans font-extrabold text-xl md:text-2xl tracking-tight">{s.value}</p>
                <p className="section-label text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right panel — hero image ── */}
        <div className="lg:flex-1 relative min-h-[320px] lg:min-h-0 overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85"
            alt="Luxury Mumbai penthouse interior"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />

          {/* Featured listing card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-auto bg-foreground text-card p-4 md:p-5 max-w-xs border-2 border-primary"
          >
            <p className="section-label text-primary mb-1.5">Featured Listing</p>
            <p className="font-sans font-bold text-base leading-tight mb-1">The Worli Sea Face Penthouse</p>
            <p className="font-mono text-xs text-card/50 mb-3">Worli, Mumbai</p>
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-base text-primary">₹8,50,000<span className="text-card/40 font-normal text-xs">/mo</span></span>
              <a
                href="#listings"
                className="btn-fill-dark font-mono text-[10px] uppercase tracking-[0.2em] font-bold bg-primary text-primary-foreground px-3 py-1.5 border border-primary-foreground/20 cursor-pointer inline-block"
              >
                View →
              </a>
            </div>
          </motion.div>

          {/* Vertical edge label */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden lg:flex items-center gap-1.5" style={{ writingMode: "vertical-rl" }}>
            <div className="w-px h-10 bg-card/30" />
            <span className="font-mono text-[10px] text-card/40 tracking-[0.25em] uppercase">Mumbai's Finest Residences</span>
          </div>

          {/* Corner marker */}
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-card/30 hidden md:block" />
        </div>
      </div>
    </section>
  );
}
