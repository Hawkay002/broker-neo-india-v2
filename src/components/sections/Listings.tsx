import { motion } from "framer-motion";
import { listings } from "@/data";
import { useState } from "react";

const FILTERS = ["All", "Worli", "Bandra West", "Juhu", "Malabar Hill", "Powai", "Lower Parel"];

function ListingCard({ listing, index }: { listing: typeof listings[0]; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-[3px] border-foreground bg-card group overflow-hidden flex flex-col bs"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        {!imgLoaded && <div className="absolute inset-0 img-placeholder" />}
        <img
          src={listing.image}
          alt={listing.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-colors duration-300 pointer-events-none" />
        {/* Availability badge */}
        <div className="absolute top-3 left-3 bg-foreground text-card font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
          {listing.availability}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-4 flex-1 border-t-[3px] border-foreground">
        <div>
          <p className="section-label text-muted-foreground mb-1">{listing.neighborhood}</p>
          <h3 className="font-sans font-bold text-base md:text-lg leading-tight">{listing.name}</h3>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <span>{listing.beds} Bed</span>
          <span className="text-foreground/20">·</span>
          <span>{listing.baths} Bath</span>
          <span className="text-foreground/20">·</span>
          <span>{listing.sqft} sq.ft.</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t-[2px] border-foreground/15">
          <div>
            <span className="font-mono font-bold text-lg">{listing.price}</span>
            <span className="font-mono text-xs text-muted-foreground">/mo</span>
          </div>
          <button className="btn-fill-dark bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 border-2 border-foreground bs bs-hover cursor-pointer">
            View →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Listings() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? listings : listings.filter((l) => l.neighborhood === active);

  return (
    <section id="listings" className="bg-background border-b-[3px] border-foreground">
      {/* Section header */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="section-label text-muted-foreground">02 /</span>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">Current Listings</h2>
        </div>
        <a
          href="#contact"
          className="btn-fill-primary bg-transparent text-foreground border-2 border-foreground/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer inline-block self-start md:self-auto"
        >
          Request Off-Market →
        </a>
      </div>

      {/* Filters */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex gap-2 overflow-x-auto scrollbar-none -webkit-overflow-scrolling-touch">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-3.5 py-1.5 border-2 transition-all duration-200 cursor-pointer ${
              active === f
                ? "bg-foreground text-card border-foreground"
                : "btn-fill-primary bg-transparent text-foreground border-foreground/30 hover:border-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-5 md:px-10 py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {filtered.map((listing, i) => (
          <ListingCard key={listing.id} listing={listing} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="border-t-[3px] border-foreground px-5 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-sans text-muted-foreground text-sm">
          <span className="font-bold text-foreground">12 more properties</span> available off-market.
        </p>
        <a
          href="#contact"
          className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block"
        >
          See All Listings →
        </a>
      </div>
    </section>
  );
}
