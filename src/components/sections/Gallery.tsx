import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { portfolio, type PortfolioCategory } from "@/data";

const CATEGORIES: { key: PortfolioCategory | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Interior", label: "Interior" },
  { key: "Exterior", label: "Exterior" },
  { key: "Amenities", label: "Amenities" },
];

const PORTFOLIO_CATEGORIES: PortfolioCategory[] = ["Interior", "Exterior", "Amenities"];

const EASE_SPRING = [0.22, 1, 0.36, 1] as const;

const ASPECT_MAP: Record<PortfolioCategory, string> = {
  Interior: "3/4",
  Exterior: "4/3",
  Amenities: "1/1",
};

// ── Default "All" view: one cycling box per category ──
function CategoryCycleBox({ category, catIndex }: { category: PortfolioCategory; catIndex: number }) {
  const images = portfolio.filter((img) => img.category === category);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
        setLoaded(false);
      }, 3400);
    }, catIndex * 700);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [images.length, catIndex]);

  const current = images[currentIdx] ?? images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
      className={`flex flex-col overflow-hidden border-foreground ${
        catIndex < PORTFOLIO_CATEGORIES.length - 1
          ? "border-b-[3px] md:border-b-0 md:border-r-[3px]"
          : ""
      }`}
    >
      {/* Category header */}
      <div className="border-b-[3px] border-foreground px-4 py-2.5 bg-foreground text-card flex items-center justify-between flex-shrink-0">
        <span className="section-label">{category}</span>
        <span className="section-label text-card/40">{images.length} images</span>
      </div>

      {/* Cycling image */}
      <div className="relative overflow-hidden flex-1" style={{ aspectRatio: ASPECT_MAP[category] }}>
        {!loaded && <div className="absolute inset-0 img-placeholder" />}
        <AnimatePresence mode="wait">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.label}
            onLoad={() => setLoaded(true)}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className={`absolute inset-0 w-full h-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </AnimatePresence>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary text-primary-foreground font-mono text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5">
            {category}
          </span>
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pt-8 pb-3 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent z-10 pointer-events-none">
          <p className="font-bold text-card text-xs md:text-sm leading-tight">{current.label}</p>
          <p className="text-card/60 font-mono text-[9px] uppercase tracking-[0.15em] mt-0.5">{current.property}</p>
        </div>

        {/* Cycling dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-20 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIdx(i); setLoaded(false); }}
                className="h-1 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === currentIdx ? "12px" : "4px",
                  background: i === currentIdx ? "hsl(14 56% 49%)" : "rgba(248,245,240,0.5)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Specific category view: all images in a grid ──
function PortfolioItem({
  img,
  index,
  category,
  categoryImages,
}: {
  img: (typeof portfolio)[0];
  index: number;
  category: PortfolioCategory | "All";
  categoryImages: typeof portfolio;
}) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(() =>
    category === "All" ? 0 : Math.max(0, categoryImages.findIndex((i) => i.src === img.src))
  );

  useEffect(() => {
    if (category === "All" || categoryImages.length <= 1) {
      setCurrentImgIndex(0);
      return;
    }
    const startIdx = Math.max(0, categoryImages.findIndex((i) => i.src === img.src));
    setCurrentImgIndex(startIdx);
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % categoryImages.length);
        setLoaded(false);
      }, 2600 + index * 180);
      return () => clearInterval(timer);
    }, index * 350);
    return () => clearTimeout(delay);
  }, [category, categoryImages.length]);

  const currentImg = category === "All" ? img : (categoryImages[currentImgIndex] ?? img);

  const aspectMapLocal: Record<string, string> = {
    Interior: "3/4",
    Exterior: "4/3",
    Amenities: "1/1",
    All: index % 5 === 0 ? "3/4" : index % 3 === 0 ? "1/1" : "4/3",
  };
  const currentCat = category === "All" ? img.category : category;

  return (
    <motion.div
      layout
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      exit={{ clipPath: "inset(0 0 0 100%)" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.76, 0, 0.24, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTap={() => setHovered((h) => !h)}
      className={`relative overflow-hidden border-b-[3px] md:border-b-0 ${
        index % 3 === 2 ? "md:border-r-0" : "md:border-r-[3px] border-r-[3px]"
      } border-foreground cursor-pointer`}
      style={{ aspectRatio: aspectMapLocal[currentCat] || "4/3" }}
    >
      {!loaded && <div className="absolute inset-0 img-placeholder" />}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImg.src}
          src={currentImg.src}
          alt={currentImg.label}
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ scale: hovered ? 1.08 : 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.5, ease: EASE_SPRING } }}
          className={`w-full h-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ willChange: "transform" }}
        />
      </AnimatePresence>

      <motion.div
        className="gallery-overlay absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent flex flex-col justify-end p-3 md:p-4 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ willChange: "opacity" }}
      >
        <motion.div
          className="gallery-label"
          animate={{ y: hovered ? 0 : "100%" }}
          initial={{ y: "100%" }}
          transition={{ duration: 0.4, ease: EASE_SPRING }}
          style={{ willChange: "transform" }}
        >
          <span className="bg-primary text-primary-foreground font-mono text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 block w-fit mb-1">
            {currentImg.category}
          </span>
          <p className="text-card font-bold text-xs md:text-sm leading-tight">{currentImg.label}</p>
          <p className="text-card/60 font-mono text-[9px] uppercase tracking-[0.15em] mt-0.5">{currentImg.property}</p>
        </motion.div>
      </motion.div>

      <div className="absolute top-3 left-3 z-10">
        <span className="bg-foreground/70 text-card font-mono text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 backdrop-blur-sm">
          {currentImg.category}
        </span>
      </div>

      {category !== "All" && categoryImages.length > 1 && (
        <div className="absolute bottom-3 right-3 z-10 flex gap-1">
          {categoryImages.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === currentImgIndex ? "12px" : "4px",
                background: i === currentImgIndex ? "hsl(14 56% 49%)" : "rgba(248,245,240,0.5)",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<PortfolioCategory | "All">("All");

  const filtered = active === "All" ? portfolio : portfolio.filter((img) => img.category === active);
  const categoryImages = active === "All" ? [] : portfolio.filter((img) => img.category === active);

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
      <div className="border-b-[3px] border-foreground">
        <AnimatePresence mode="popLayout">
          {active === "All" ? (
            /* Default view: 3 category cycling boxes */
            <motion.div
              key="all-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3"
            >
              {PORTFOLIO_CATEGORIES.map((cat, i) => (
                <CategoryCycleBox key={cat} category={cat} catIndex={i} />
              ))}
            </motion.div>
          ) : (
            /* Category-specific view: all images in a grid */
            <motion.div
              key={`cat-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-0"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((img, i) => (
                  <PortfolioItem
                    key={img.src + img.label}
                    img={img}
                    index={i}
                    category={active}
                    categoryImages={categoryImages}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
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
