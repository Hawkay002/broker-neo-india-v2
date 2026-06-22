import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { portfolio, type PortfolioCategory } from "@/data";

const CATEGORIES: { key: PortfolioCategory | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Interior", label: "Interior" },
  { key: "Exterior", label: "Exterior" },
  { key: "Amenities", label: "Amenities" },
];

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

  // Vary aspect ratio per category for visual interest
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
      className={`relative overflow-hidden group border-b-[3px] md:border-b-0 ${
        index % 3 === 2 ? "md:border-r-0" : "md:border-r-[3px] border-r-[3px]"
      } border-foreground cursor-pointer`}
      style={{ aspectRatio: aspectMap[currentCat] || "4/3" }}
    >
      {!loaded && <div className="absolute inset-0 img-placeholder" />}
      <img
        src={img.src}
        alt={img.label}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Slide-reveal overlay — label slides up from bottom on hover */}
      <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4 pointer-events-none">
        <div
          className="gallery-label translate-y-full group-hover:translate-y-0 transition-transform"
          style={{ transitionDuration: "400ms", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)", willChange: "transform" }}
        >
          <span className="bg-primary text-primary-foreground font-mono text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 block w-fit mb-1">
            {img.category}
          </span>
          <p className="text-card font-bold text-xs md:text-sm leading-tight">{img.label}</p>
          <p className="text-card/60 font-mono text-[9px] uppercase tracking-[0.15em] mt-0.5">{img.property}</p>
        </div>
      </div>
      {/* Category tag — always visible as small pill */}
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
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

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

      {/* Masonry-style grid — AnimatePresence for smooth category switching */}
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
