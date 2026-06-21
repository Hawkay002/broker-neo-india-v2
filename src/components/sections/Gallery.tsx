import { motion } from "framer-motion";
import { useState } from "react";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", label: "Worli Penthouse — Living", tag: "Interior" },
  { src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80", label: "Bandra Sky Lofts — Suite", tag: "Interior" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", label: "Juhu Beach View — Facade", tag: "Exterior" },
  { src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", label: "Malabar Hill Estate — Pool", tag: "Exterior" },
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", label: "Powai Lake Residences — Main Hall", tag: "Interior" },
  { src: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80", label: "Lower Parel Glass Villa — Tower", tag: "Exterior" },
];

export default function Gallery() {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  return (
    <section id="gallery" className="bg-card border-b-[3px] border-foreground">
      {/* Header */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="section-label text-muted-foreground">03 /</span>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">The Portfolio</h2>
        </div>
        <span className="section-label text-muted-foreground hidden md:block">{IMAGES.length} properties shown</span>
      </div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-b-[3px] border-foreground">
        {IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className={`relative overflow-hidden group border-b-[3px] border-r-[3px] border-foreground cursor-pointer ${
              i % 3 === 2 ? "md:border-r-0" : ""
            } ${i >= IMAGES.length - (IMAGES.length % 3 || 3) ? "border-b-0" : ""}`}
            style={{ aspectRatio: i % 5 === 0 ? "3/4" : "4/3" }}
          >
            {!loaded[i] && <div className="absolute inset-0 img-placeholder" />}
            <img
              src={img.src}
              alt={img.label}
              onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08] ${
                loaded[i] ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Overlay */}
            <div className="gallery-overlay absolute inset-0 bg-foreground/0 group-hover:bg-foreground/55 transition-colors duration-300 flex flex-col justify-end p-3 md:p-4 pointer-events-none">
              <div className="gallery-label opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="bg-primary text-primary-foreground font-mono text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 block w-fit mb-1">
                  {img.tag}
                </span>
                <p className="text-card font-bold text-xs md:text-sm leading-tight">{img.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="px-5 md:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="section-label text-muted-foreground">All properties photographed by BRUT Studio</p>
        <a
          href="#contact"
          className="btn-fill-dark bg-primary text-primary-foreground px-5 py-2.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block"
        >
          Schedule a Viewing →
        </a>
      </div>
    </section>
  );
}
