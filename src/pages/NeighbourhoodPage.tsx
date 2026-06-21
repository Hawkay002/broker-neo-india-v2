import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { neighbourhoods, listings, type Neighbourhood } from "@/data";
import { useParams, Link } from "wouter";
import { ArrowUpRight, MapPin, Tag, Building2, Phone } from "lucide-react";
import NotFound from "@/pages/not-found";

export default function NeighbourhoodPage() {
  const { slug } = useParams<{ slug: string }>();
  const hood: Neighbourhood | undefined = neighbourhoods.find((n) => n.slug === slug);
  if (!hood) {
    return <NotFound />;
  }

  const hoodListings = listings.filter((l) => l.neighborhoodSlug === slug);
  const otherHoods = neighbourhoods.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <div className="pt-[68px]">
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <PageHero
          eyebrow="Neighbourhoods"
          title={hood.name}
          highlight={hood.tagline}
          subtitle={hood.blurb}
          crumb="Neighbourhoods"
          image={hood.image}
        />

        {/* Key highlights */}
        <section className="border-b-[3px] border-foreground bg-card">
          <div className="px-5 md:px-10 py-3 border-b-[2px] border-foreground/15">
            <span className="section-label text-muted-foreground">At a glance</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-[3px] divide-y-[3px] md:divide-y-0 divide-foreground/15">
            <div className="px-5 md:px-10 py-5">
              <span className="section-label text-muted-foreground">Avg. Rent</span>
              <p className="font-sans font-bold text-lg mt-1">{hood.avgRent}</p>
            </div>
            <div className="px-5 md:px-10 py-5">
              <span className="section-label text-muted-foreground">Avg. Price</span>
              <p className="font-sans font-bold text-lg mt-1">{hood.avgPrice}</p>
            </div>
            <div className="px-5 md:px-10 py-5 col-span-2">
              <div className="flex flex-wrap gap-2 mt-1">
                {hood.vibe.map((v) => (
                  <span key={v} className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 border border-foreground/25 text-foreground">{v}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-[3px] divide-foreground/15">
            {hood.highlights.map((h) => (
              <div key={h.label} className="px-5 md:px-10 py-4 border-t-[2px] border-foreground/10">
                <span className="section-label text-muted-foreground">{h.label}</span>
                <p className="font-sans font-bold text-sm mt-0.5">{h.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16 max-w-4xl">
          <RevealGroup stagger={0.08}>
            <div className="flex flex-col gap-4">
              {hood.description.map((p, i) => (
                <Reveal key={i} direction="up">
                  <p className="font-sans text-muted-foreground leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* Photo strip */}
        <section className="border-b-[3px] border-foreground">
          <div className="grid grid-cols-3 divide-x-[3px] divide-foreground">
            {hood.gallery.map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden">
                <img src={img} alt={`${hood.name} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </section>

        {/* Listings in this neighbourhood */}
        {hoodListings.length > 0 && (
          <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16">
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight mb-8">
              Properties in {hood.name}
            </h2>
            <RevealGroup stagger={0.06}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {hoodListings.map((listing) => (
                  <Reveal key={listing.id} direction="up">
                    <Link to={`/listings/${listing.slug}`} className="group block border-[3px] border-foreground bg-card overflow-hidden bs tilt h-full">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={listing.image} alt={listing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-foreground text-card font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
                          {listing.availability}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 p-5 border-t-[3px] border-foreground h-full">
                        <p className="section-label text-muted-foreground">{listing.neighborhood}</p>
                        <h3 className="font-sans font-bold text-base leading-tight group-hover:text-primary transition-colors">{listing.name}</h3>
                        <p className="font-sans text-sm text-muted-foreground mt-1 line-clamp-2">{listing.tagline}</p>
                        <div className="flex items-center justify-between mt-auto pt-3 border-t-[2px] border-foreground/15">
                          <span className="font-mono font-bold text-lg">{listing.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-primary inline-flex items-center gap-1">
                            View <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </RevealGroup>
          </section>
        )}

        {/* CTA */}
        <section className="bg-foreground text-card px-5 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-[3px] border-foreground">
          <div>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight mb-2">
              Looking in {hood.name}?
            </h2>
            <p className="font-sans text-card/60 max-w-md">Speak with the broker who specialises in {hood.name}.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+912245678900" className="btn-fill-primary-on-dark bg-foreground text-card px-6 py-3.5 font-bold border-2 border-card/30 bs-cream bs-cream-hover uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a href="/#contact" className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3.5 font-bold border-2 border-primary-foreground/20 uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2">
              Get in Touch <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Other neighbourhoods */}
        <section className="px-5 md:px-10 py-12">
          <h2 className="font-sans font-extrabold text-2xl tracking-tight mb-6">Other Neighbourhoods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherHoods.map((n) => (
              <Link key={n.slug} to={`/neighbourhoods/${n.slug}`} className="group border-[3px] border-foreground bg-card overflow-hidden bs tilt">
                <div className="aspect-[16/7] overflow-hidden">
                  <img src={n.image} alt={n.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 border-t-[3px] border-foreground">
                  <h3 className="font-sans font-bold text-base group-hover:text-primary transition-colors">{n.name}</h3>
                  <p className="font-sans text-sm text-muted-foreground mt-1">{n.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
