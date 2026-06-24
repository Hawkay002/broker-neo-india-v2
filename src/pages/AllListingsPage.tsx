import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { listings, FILTERS } from "@/data";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Bed, Bath, Maximize, Search } from "lucide-react";
import SEO from "@/components/SEO";

export default function AllListingsPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = active === "All"
    ? listings
    : listings.filter((l) => l.neighborhood === active);
  const displayed = search
    ? filtered.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.neighborhood.toLowerCase().includes(search.toLowerCase())
      )
    : filtered;

  return (
    <div className="pt-20">
      <SEO
        title="All Listings"
        description="Browse premium properties for rent and sale across Mumbai's finest neighbourhoods — Worli, Bandra, Juhu, Malabar Hill and beyond."
        path="/listings"
      />
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <PageHero
          eyebrow="Properties"
          title="All Listings"
          highlight="in Mumbai"
          subtitle="Every on-market property we're currently representing across Mumbai's finest neighbourhoods."
          crumb="Listings"
        />

        {/* Filters + search */}
        <section className="border-b-[3px] border-foreground">
          <div className="px-5 md:px-10 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-3.5 py-1.5 border-2 transition-all duration-200 cursor-pointer ${
                    active === f
                      ? "bg-foreground text-card border-foreground"
                      : "bg-transparent text-foreground border-foreground/30 hover:border-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search listings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border-2 border-foreground/30 focus:border-primary bg-transparent font-sans text-sm outline-none w-full md:w-64"
              />
            </div>
          </div>
          <div className="px-5 md:px-10 py-2 flex items-center justify-between">
            <span className="section-label text-muted-foreground">{displayed.length} {displayed.length === 1 ? "property" : "properties"}</span>
          </div>
        </section>

        {/* Grid */}
        <section className="px-5 md:px-10 py-10 md:py-14">
          <RevealGroup stagger={0.06}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {displayed.map((listing) => (
                <Reveal key={listing.id} direction="up">
                  <Link to={`/listings/${listing.slug}`} className="group block border-[3px] border-foreground bg-card overflow-hidden bs tilt h-full">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={listing.image}
                        alt={listing.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                      <div className="absolute top-3 left-3 bg-foreground text-card font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
                        {listing.availability}
                      </div>
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
                        {listing.type}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 p-5 border-t-[3px] border-foreground h-full">
                      <div>
                        <p className="section-label text-muted-foreground mb-1">{listing.neighborhood}</p>
                        <h3 className="font-sans font-bold text-lg leading-tight group-hover:text-primary transition-colors">{listing.name}</h3>
                        <p className="font-sans text-sm text-muted-foreground mt-1 line-clamp-2">{listing.tagline}</p>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Bed className="w-3 h-3" />{listing.beds}</span>
                        <span className="text-foreground/20">·</span>
                        <span className="inline-flex items-center gap-1"><Bath className="w-3 h-3" />{listing.baths}</span>
                        <span className="text-foreground/20">·</span>
                        <span className="inline-flex items-center gap-1"><Maximize className="w-3 h-3" />{listing.sqft}</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t-[2px] border-foreground/15">
                        <span className="font-mono font-bold text-lg">{listing.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          View <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </RevealGroup>

          {displayed.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-sans font-bold text-xl mb-2">No listings match your criteria.</p>
              <p className="font-sans text-muted-foreground text-sm">Try a different filter or <a href="/#contact" className="text-primary underline">contact a broker</a> for off-market options.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
