import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { portfolio, type PortfolioCategory } from "@/data";

const CATEGORIES: { key: PortfolioCategory | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Interior", label: "Interior" },
  { key: "Exterior", label: "Exterior" },
  { key: "Amenities", label: "Amenities" },
];

const EASE_SPRING = [0.22, 1, 0.36, 1] as const;

function PortfolioItem({
  img,
  index,
  category,
}: {
  img: (typeof portfolio)[0];
  index: number;
  category: PortfolioCategory | "All";
}) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const aspectMap: Record<string, string> = {
    Interior: "3/4",
    Exterior: "4/3",
    Amenities: "1/1",
    All: index % 5 === 0 ? "3/4" : index % 3 === 0 ? "1/1" : "4/3",
  };

  const currentCat = category === "All" ? img.category : category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative overflow-hidden border-b-[3px] md:border-b-0 ${
        index % 3 === 2 ? "md:border-r-0" : "md:border-r-[3px] border-r-[3px]"
      } border-foreground cursor-pointer`}
      style={{ aspectRatio: aspectMap[currentCat] || "4/3" }}
    >
      {!loaded && <div className="absolute inset-0 img-placeholder" />}
      <motion.img
        src={img.src}
        alt={img.label}
        onLoad={() => setLoaded(true)}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: EASE_SPRING }}
        className={`w-full h-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ willChange: "transform" }}
      />

      {/* Slide-reveal overlay — fades in on hover */}
      <motion.div
        className="gallery-overlay absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent flex flex-col justify-end p-3 md:p-4 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ willChange: "opacity" }}
      >
        {/* Label slides up from bottom */}
        <motion.div
          className="gallery-label"
          animate={{ y: hovered ? 0 : "100%" }}
          initial={{ y: "100%" }}
          transition={{ duration: 0.4, ease: EASE_SPRING }}
          style={{ willChange: "transform" }}
        >
          <span className="bg-primary text-primary-foreground font-mono text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 block w-fit mb-1">
            {img.category}
          </span>
          <p className="text-card font-bold text-xs md:text-sm leading-tight">{img.label}</p>
          <p className="text-card/60 font-mono text-[9px] uppercase tracking-[0.15em] mt-0.5">{img.property}</p>
        </motion.div>
      </motion.div>

      {/* Category tag — always visible */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-foreground/70 text-card font-mono text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 backdrop-blur-sm">
          {img.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<PortfolioCategory | "All">("All");

  const filtered = active === "All" ? portfolio : portfolio.filter((img) => img.category === active);

  return (
    <section id="gallery" className="bg-card border-b-[3px] border-foreground">
      {/* Header */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="section-label text-muted-foreground">03 /</span>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">The Portfolio</h2>
        </div>
        <span className="section-label text-muted-foreground">{portfolio.length} images across 3 categories</span>
      </div>

      {/* Category filters */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex gap-2 overflow-x-auto scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-3.5 py-1.5 border-2 transition-all duration-200 cursor-pointer ${
              active === cat.key
                ? "bg-foreground text-card border-foreground"
                : "btn-fill-primary bg-transparent text-foreground border-foreground/30 hover:border-primary"
            }`}
          >
            {cat.label}
            {cat.key !== "All" && (
              <span className="ml-1.5 text-muted-foreground">
                ({portfolio.filter((i) => i.category === cat.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-b-[3px] border-foreground">
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <PortfolioItem key={img.src + img.label} img={img} index={i} category={active} />
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="px-5 md:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="section-label text-muted-foreground">All properties photographed by BRUT Studio</p>
        <a
          href="/#contact"
          className="btn-fill-dark bg-primary text-primary-foreground px-5 py-2.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block"
        >
          Schedule a Viewing →
        </a>
      </div>
    </section>
  );
}
