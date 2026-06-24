import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { listings, type Listing } from "@/data";
import { useParams, Link } from "wouter";
import { useState } from "react";
import NotFound from "@/pages/not-found";
import { ArrowLeft, ArrowUpRight, Bed, Bath, Maximize, Check, MapPin, Calendar, Phone } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import VirtualTour from "@/components/VirtualTour";
import SEO from "@/components/SEO";

function ListingGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[16/10] overflow-hidden border-[3px] border-foreground bg-muted">
        {!loaded[active] && <div className="absolute inset-0 img-placeholder" />}
        <motion.img
          key={active}
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          onLoad={() => setLoaded((p) => ({ ...p, [active]: true }))}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-foreground text-card font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.18em]">
          {active + 1} / {images.length}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-[4/3] overflow-hidden border-2 cursor-pointer transition-all ${
              i === active ? "border-primary scale-[0.98]" : "border-foreground/20 hover:border-foreground/50"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ListingDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const listing: Listing | undefined = listings.find((l) => l.slug === slug);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  if (!listing) {
    return <NotFound />;
  }

  const related = listings.filter((l) => l.id !== listing.id && l.neighborhood === listing.neighborhood).slice(0, 3);
  const fallbackRelated = listings.filter((l) => l.id !== listing.id).slice(0, 3);
  const relatedList = related.length ? related : fallbackRelated;

  return (
    <div className="pt-20">
      <SEO
        title={listing.name}
        description={listing.tagline}
        path={`/listings/${listing.slug}`}
        image={listing.gallery[0] || listing.image}
      />
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        {/* Breadcrumb / back */}
        <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex items-center justify-between">
          <Link href="/listings" className="section-label text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft className="w-3 h-3" /> All Listings
          </Link>
          <span className="section-label text-muted-foreground">{listing.neighborhood} · {listing.type}</span>
        </div>

        {/* Title block */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end">
          <Reveal direction="up">
            <div>
              <p className="section-label text-primary mb-3 inline-flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> {listing.neighborhood}, Mumbai
              </p>
              <h1 className="font-sans font-extrabold leading-[0.92] tracking-[-0.04em] mb-3" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
                {listing.name}
              </h1>
              <p className="font-sans text-muted-foreground text-base md:text-lg max-w-xl">{listing.tagline}</p>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="border-[3px] border-foreground bg-card p-5 bs min-w-[240px]">
              <p className="section-label text-muted-foreground mb-1">Monthly Rent</p>
              <p className="font-mono font-extrabold text-3xl tracking-tight">{listing.price}</p>
              <p className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground mt-2">
                <Calendar className="w-3 h-3" /> {listing.availability}
              </p>
            </div>
          </Reveal>
        </section>

        {/* Stats strip */}
        <section className="border-b-[3px] border-foreground grid grid-cols-3 divide-x-[3px] divide-foreground">
          {[
            { icon: Bed, label: "Bedrooms", value: listing.beds },
            { icon: Bath, label: "Bathrooms", value: listing.baths },
            { icon: Maximize, label: "Built-up", value: `${listing.sqft} sq.ft.` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="px-5 md:px-10 py-5 flex items-center gap-3">
              <Icon className="w-5 h-5 text-primary" />
              <div>
                <p className="section-label text-muted-foreground">{label}</p>
                <p className="font-sans font-bold text-lg">{value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Gallery + description */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
          <Reveal direction="up">
            <ListingGallery images={listing.gallery} name={listing.name} />
          </Reveal>

          <RevealGroup stagger={0.1}>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="font-sans font-extrabold text-2xl tracking-tight mb-4">Overview</h2>
                <div className="flex flex-col gap-3">
                  {listing.description.map((p, i) => (
                    <p key={i} className="font-sans text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>

              <div className="border-t-[2px] border-foreground/15 pt-5">
                <h3 className="section-label text-muted-foreground mb-3">Key Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {listing.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealGroup>
        </section>

        {/* Virtual Tour */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-10 md:py-14 bg-foreground text-card">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-sans font-extrabold text-2xl tracking-tight">Virtual Walkthrough</h2>
              <p className="font-sans text-card/60 mt-1 max-w-md">Explore a 3D representation of a similar BRUT property.</p>
            </div>
            <button
              onClick={() => setTourOpen(true)}
              className="btn-fill-dark bg-primary text-primary-foreground px-5 py-3 font-bold border-2 border-primary-foreground/20 bs-cream bs-cream-hover uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2"
            >
              Open Fullscreen 3D Tour
            </button>
          </div>
          <div className="h-[400px] border-2 border-card/20 overflow-hidden">
            <VirtualTour accentColor="#c6633f" />
          </div>
        </section>

        {/* 3D Tour Modal */}
        {tourOpen && (
          <div className="fixed inset-0 z-50 bg-foreground/95 flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-card/20">
              <p className="section-label text-card/60">Virtual Walkthrough</p>
              <button
                onClick={() => setTourOpen(false)}
                className="text-card hover:text-primary transition-colors cursor-pointer font-mono text-xs uppercase tracking-wider"
              >
                Close [Esc]
              </button>
            </div>
            <div className="flex-1">
              <VirtualTour accentColor="#c6633f" />
            </div>
          </div>
        )}

        {/* Amenities */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-10 md:py-14 bg-card">
          <h2 className="font-sans font-extrabold text-2xl tracking-tight mb-6">Building Amenities</h2>
          <RevealGroup stagger={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {listing.amenities.map((a) => (
                <Reveal key={a} direction="up">
                  <div className="border-2 border-foreground/20 bg-background p-4 hover:border-primary transition-colors">
                    <p className="font-sans font-bold text-sm">{a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* CTA */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-foreground text-card">
          <div>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight mb-2">Interested in this property?</h2>
            <p className="font-sans text-card/60 max-w-md">Book a private viewing with the broker who runs the {listing.neighborhood} desk.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+912245678900" className="btn-fill-primary-on-dark bg-foreground text-card px-6 py-3.5 font-bold border-2 border-card/30 bs-cream bs-cream-hover uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <button
              onClick={() => setBookingOpen(true)}
              className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3.5 font-bold border-2 border-primary-foreground/20 uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2"
            >
              Book a Viewing <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Related */}
        <section className="px-5 md:px-10 py-12">
          <h2 className="font-sans font-extrabold text-2xl tracking-tight mb-6">More in {listing.neighborhood}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedList.map((l) => (
              <Link key={l.id} to={`/listings/${l.slug}`} className="group border-[3px] border-foreground bg-card overflow-hidden bs tilt">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={l.image} alt={l.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 border-t-[3px] border-foreground">
                  <p className="section-label text-muted-foreground mb-1">{l.neighborhood}</p>
                  <p className="font-sans font-bold text-base leading-tight group-hover:text-primary transition-colors">{l.name}</p>
                  <p className="font-mono font-bold text-sm mt-2 text-primary">{l.price}<span className="text-muted-foreground font-normal text-xs">/mo</span></p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        propertyContext={`Interested in: ${listing.name} (${listing.neighborhood})`}
      />
    </div>
  );
}
