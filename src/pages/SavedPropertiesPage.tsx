import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { useWishlist } from "@/hooks/useWishlist";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function SavedPropertiesPage() {
  const { savedListings, clearAll, toggle } = useWishlist();
  const [imgLoaded, setImgLoaded] = useState<Record<number, boolean>>({});

  return (
    <div className="pt-20">
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex items-center justify-between">
          <Link href="/" className="section-label text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <span className="section-label text-muted-foreground">
            {savedListings.length} saved
          </span>
        </div>

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-8 md:py-12 bg-primary text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="section-label text-primary-foreground/70 mb-2">BRUT Realty</p>
            <h1 className="font-sans font-extrabold leading-[0.95] tracking-tight text-balance" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
              Saved Properties
            </h1>
            <p className="font-sans text-base md:text-lg text-primary-foreground/80 mt-4 max-w-xl leading-relaxed">
              Your shortlist — revisit anytime.
            </p>
          </motion.div>
        </section>

        <section className="px-5 md:px-10 py-10">
          {savedListings.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-foreground/20">
              <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-sans font-bold text-xl text-muted-foreground mb-2">No saved properties yet</p>
              <p className="font-sans text-sm text-muted-foreground/60 mb-6">
                Click the heart icon on any listing to save it here.
              </p>
              <Link
                to="/#listings"
                className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] font-bold border-2 border-foreground cursor-pointer inline-block"
              >
                Browse Listings
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="font-sans text-sm text-muted-foreground">
                  {savedListings.length} property{savedListings.length !== 1 ? "ies" : "y"} saved
                </p>
                <button
                  onClick={clearAll}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] font-bold text-destructive hover:text-destructive/80 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {savedListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-2 border-foreground bg-card group overflow-hidden flex flex-col bs tilt"
                  >
                    <Link to={`/listings/${listing.slug}`} className="block relative">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        {!imgLoaded[listing.id] && <div className="absolute inset-0 img-placeholder" />}
                        <img
                          src={listing.image}
                          alt={listing.name}
                          loading="lazy"
                          onLoad={() => setImgLoaded((p) => ({ ...p, [listing.id]: true }))}
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded[listing.id] ? "opacity-100" : "opacity-0"}`}
                        />
                        <div className="absolute top-3 left-3 bg-foreground text-card font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
                          {listing.availability}
                        </div>
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
                          {listing.type}
                        </div>
                        <button
                          onClick={(e) => { e.preventDefault(); toggle(listing.id); }}
                          className="absolute bottom-3 left-3 w-8 h-8 bg-foreground/80 hover:bg-foreground flex items-center justify-center transition-colors cursor-pointer z-10"
                          aria-label="Remove from saved"
                        >
                          <Heart className="w-4 h-4 text-primary fill-primary" />
                        </button>
                      </div>
                    </Link>
                    <div className="flex flex-col gap-3 p-5 flex-1 border-t-[3px] border-foreground">
                      <Link to={`/listings/${listing.slug}`} className="block group/link">
                        <p className="section-label text-muted-foreground mb-1">{listing.neighborhood}</p>
                        <h3 className="font-sans font-bold text-lg leading-tight group-hover/link:text-primary transition-colors">{listing.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t-[2px] border-foreground/15">
                        <span className="font-mono font-bold text-lg">{listing.price}</span>
                        <Link
                          to={`/listings/${listing.slug}`}
                          className="btn-fill-dark bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 border-2 border-foreground bs bs-hover cursor-pointer inline-block"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}