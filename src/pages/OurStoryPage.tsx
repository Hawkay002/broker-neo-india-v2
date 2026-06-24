import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import SEO from "@/components/SEO";

const TIMELINE = [
  {
    year: "2009",
    title: "The Frustration",
    body: "Our founder Arjun Sharma wasted four months with three different brokers across Mumbai. Every showing missed his criteria. Every follow-up was a sales pitch. He made a promise: build a firm that actually listens.",
  },
  {
    year: "2009",
    title: "One Broker, One Neighbourhood",
    body: "BRUT launched with a single broker (Arjun), a single neighbourhood (Worli), and one rule: never show a client a property you wouldn't recommend to your own family. That rule still governs every deal we do.",
  },
  {
    year: "2013",
    title: "Expanding the Bench",
    body: "Priya Mehta joined to run the sea-facing estates desk. Rohan Kapoor followed to cover Lower Parel and Powai. The specialist model took shape: one broker, one micro-market, zero territory overlap.",
  },
  {
    year: "2017",
    title: "Off-Market Access",
    body: "BRUT built relationships with owners across Malabar Hill, Worli, and Bandra who preferred to sell privately. Our off-market desk quietly became the largest private inventory in South Mumbai.",
  },
  {
    year: "2021",
    title: "500 Deals Closed",
    body: "BRUT crossed 500 closed deals with a 98% client satisfaction rate. The average time from first call to signed agreement: 11 days — a number that hasn't changed since our first year.",
  },
  {
    year: "2024",
    title: "Four Brokers, Six Neighbourhoods",
    body: "Today, BRUT operates across Worli, Bandra West, Juhu, Malabar Hill, Lower Parel, and Powai. Nisha Patel runs the Malabar Hill desk, giving us four specialist brokers across six micro-markets.",
  },
  {
    year: "Now",
    title: "The Same Promise",
    body: "We're still the same firm. No generalists. No distractions. No time-wasting. Just the broker you deserved, in the neighbourhood you want.",
  },
];

const VALUES = [
  { title: "Radical Honesty", body: "We tell you if a property isn't right for you — even if we lose the deal. Long-term trust over short-term commissions." },
  { title: "Zero Time-Waste", body: "We send you 3–5 properties maximum, all pre-vetted. No scrolling through hundreds of irrelevant listings." },
  { title: "Expert First", body: "Every broker specialises in one micro-market. You get a true expert, not a generalist who covers all of Mumbai." },
  { title: "Results or Nothing", body: "Average time from first call to signed agreement: 11 days. We measure ourselves on outcomes, not activity." },
];

export default function OurStoryPage() {
  return (
    <div className="pt-20">
      <SEO
        title="Our Story"
        description="How one frustrated buyer built Mumbai's most direct real estate firm. From 2009 to now — the BRUT Realty story."
        path="/our-story"
      />
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <PageHero
          eyebrow="About BRUT Realty"
          title="Our Story"
          highlight="from 2009 to now"
          subtitle="How one frustrated buyer built Mumbai's most direct real estate firm."
          crumb="Our Story"
        />

        {/* Story image banner */}
        <section className="border-b-[3px] border-foreground relative overflow-hidden" style={{ height: "clamp(200px, 35vw, 420px)" }}>
          <img
            src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600&q=85"
            alt="Mumbai cityscape at golden hour"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
          <div className="absolute bottom-6 left-5 md:left-10">
            <span className="watermark-dark font-sans font-extrabold text-card/90 leading-none"
              style={{ fontSize: "clamp(48px, 8vw, 96px)", WebkitTextStroke: "1.5px rgba(248,245,240,0.4)", color: "transparent" }}>
              SINCE 2009
            </span>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16">
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight mb-10">The Timeline</h2>
          <div className="max-w-4xl">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year + item.title} direction="up" delay={i * 0.05}>
                <div className="flex gap-6 md:gap-10 border-b-[2px] border-foreground/10 pb-8 last:border-b-0">
                  <div className="flex-shrink-0 w-20 md:w-28">
                    <span className="font-mono font-bold text-lg md:text-xl text-primary">{item.year}</span>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-sans font-bold text-lg md:text-xl">{item.title}</h3>
                    <p className="font-sans text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="border-b-[3px] border-foreground bg-card">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4">
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">Our Values</h2>
          </div>
          <RevealGroup stagger={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y-[3px] md:divide-y-0 md:divide-x-[3px] divide-foreground/15">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} direction="up">
                  <div className={`px-6 md:px-10 py-8 md:py-10 ${i >= 2 ? "border-t-[3px] border-foreground/15" : ""}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="font-mono font-bold text-primary text-sm">0{i + 1}</span>
                      <h3 className="font-sans font-bold text-xl">{v.title}</h3>
                    </div>
                    <p className="font-sans text-muted-foreground leading-relaxed">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-10 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-sans font-bold text-xl md:text-2xl tracking-tight max-w-sm">
            Ready to experience the BRUT difference?
          </p>
          <a
            href="/#contact"
            className="btn-fill-dark bg-primary text-primary-foreground px-7 py-4 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-sm cursor-pointer inline-block"
          >
            Book a Call →
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
