import { motion } from "framer-motion";
import { listings, FILTERS } from "@/data";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Lock } from "lucide-react";

function ListingCard({ listing, index }: { listing: (typeof listings)[0]; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-[3px] border-foreground bg-card group overflow-hidden flex flex-col bs tilt"
    >
      {/* Image */}
      <Link to={`/listings/${listing.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden relative">
          {!imgLoaded && <div className="absolute inset-0 img-placeholder" />}
          <img
            src={listing.image}
            alt={listing.name}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-colors duration-300 pointer-events-none" />
          <div className="absolute top-3 left-3 bg-foreground text-card font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
            {listing.availability}
          </div>
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
            {listing.type}
          </div>
        </div>
      </Link>

      {/* Info — wider content padding */}
      <div className="flex flex-col gap-3 p-5 flex-1 border-t-[3px] border-foreground">
        <Link to={`/listings/${listing.slug}`} className="block group/link">
          <p className="section-label text-muted-foreground mb-1">{listing.neighborhood}</p>
          <h3 className="font-sans font-bold text-lg leading-tight group-hover/link:text-primary transition-colors">{listing.name}</h3>
          <p className="font-sans text-sm text-muted-foreground mt-1 line-clamp-2">{listing.tagline}</p>
        </Link>

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
          <Link
            to={`/listings/${listing.slug}`}
            className="btn-fill-dark bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 border-2 border-foreground bs bs-hover inline-flex items-center gap-1.5 cursor-pointer"
          >
            View <ArrowUpRight className="w-3 h-3" />
          </Link>
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
        <Link
          to="/services/off-market-deals"
          className="btn-fill-primary bg-transparent text-foreground border-2 border-foreground/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer inline-flex items-center gap-1.5 self-start md:self-auto"
        >
          <Lock className="w-3 h-3" /> Off-Market Access →
        </Link>
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

      {/* Grid — wider cards, 2 cols on desktop instead of 3 for more breathing room */}
      <div className="px-5 md:px-10 py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((listing, i) => (
          <ListingCard key={listing.id} listing={listing} index={i} />
        ))}
      </div>

      {/* Bottom CTA — separated into two distinct blocks */}
      <div className="border-t-[3px] border-foreground grid grid-cols-1 md:grid-cols-2 divide-y-[3px] md:divide-y-0 md:divide-x-[3px] divide-foreground">
        {/* Off-market — makes clear you must contact a broker */}
        <Link
          to="/services/off-market-deals"
          className="group px-5 md:px-10 py-7 flex flex-col gap-2 bg-foreground text-card cursor-pointer"
        >
          <div className="flex items-center gap-2 text-primary">
            <Lock className="w-4 h-4" />
            <span className="section-label">By introduction only</span>
          </div>
          <p className="font-sans font-bold text-lg md:text-xl leading-tight">
            12 more properties available off-market.
          </p>
          <p className="font-sans text-sm text-card/60 leading-relaxed">
            These never reach the open market. <span className="text-card font-semibold">Speak with a broker</span> to see what's active.
          </p>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Request Off-Market Access <ArrowUpRight className="w-3 h-3" />
          </span>
        </Link>

        {/* See all listings → dedicated page */}
        <Link
          to="/listings"
          className="group px-5 md:px-10 py-7 flex flex-col gap-2 bg-card text-foreground cursor-pointer"
        >
          <span className="section-label text-muted-foreground">Browse everything</span>
          <p className="font-sans font-bold text-lg md:text-xl leading-tight">
            See the full line-up of public listings.
          </p>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            All current on-market properties across Worli, Bandra, Juhu, Malabar Hill, Lower Parel & Powai.
          </p>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            See All Listings <ArrowUpRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
    </section>
  );
}
