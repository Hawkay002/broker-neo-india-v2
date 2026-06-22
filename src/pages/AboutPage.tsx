import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const VALUES = [
  { title: "Radical Honesty", body: "We tell you if a property isn't right for you — even if we lose the deal. Long-term trust over short-term commissions." },
  { title: "Zero Time-Waste", body: "We send you 3–5 properties maximum, all pre-vetted. No scrolling through hundreds of irrelevant listings." },
  { title: "Expert First", body: "Every broker specialises in one micro-market. You get a true expert, not a generalist who covers all of Mumbai." },
  { title: "Results or Nothing", body: "Average time from first call to signed agreement: 11 days. We measure ourselves on outcomes, not activity." },
];

const TEAM_STATS = [
  { value: "2009", label: "Founded" },
  { value: "500+", label: "Properties Closed" },
  { value: "₹2,400 Cr+", label: "Transaction Volume" },
  { value: "4", label: "Specialist Brokers" },
];

export default function AboutPage() {
  return (
    <div className="pt-[68px]">
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="border-b-[3px] border-foreground">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex items-center gap-4">
            <span className="section-label text-muted-foreground">About BRUT Realty</span>
          </div>
          <div className="px-5 md:px-10 py-12 md:py-20 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <div className="lg:w-1/2">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-sans font-extrabold leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
              >
                We're the<br />
                <span className="stroke">broker</span><br />
                you deserved.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-sans text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
              >
                Founded in 2009, BRUT Realty was built on a single frustration: Mumbai's real estate market was full of noise, delays, and brokers who talked a lot and delivered little. We decided to do the opposite.
              </motion.p>
            </div>

            {/* Hero image + Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 flex flex-col gap-5 w-full"
            >
              <div className="relative overflow-hidden border-[3px] border-foreground bs">
                <img
                  src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=900&q=85"
                  alt="Mumbai luxury property"
                  className="w-full h-[220px] md:h-[280px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="section-label text-card/80">Mumbai · Since 2009</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {TEAM_STATS.map((s) => (
                  <div key={s.label} className="border-[3px] border-foreground bg-card p-5 md:p-6 bs">
                    <p className="font-sans font-extrabold text-3xl md:text-4xl tracking-tight mb-1">{s.value}</p>
                    <p className="section-label text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section id="story" className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label text-muted-foreground">Our Story /</span>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">How It Started</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            <div className="flex flex-col gap-4">
              <p className="font-sans text-muted-foreground leading-relaxed">
                In 2009, our founder Arjun Sharma was a frustrated buyer. He'd wasted four months with three different brokers across Mumbai, each showing him properties miles from his criteria and budget. He made a promise: build a firm that actually listened.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed">
                BRUT started with one broker, one neighbourhood (Worli), and one rule — never show a client a property you wouldn't recommend to your own family. That rule still governs every deal we do.
              </p>
              <div className="relative overflow-hidden border-[3px] border-foreground mt-2">
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85"
                  alt="Mumbai skyline at dusk"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 to-transparent" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden border-[3px] border-foreground mb-2">
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=85"
                  alt="Premium property interior"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.18em]">
                  Our Standards
                </div>
              </div>
              <p className="font-sans text-muted-foreground leading-relaxed">
                Today, we operate across Mumbai's most sought-after neighbourhoods with a team of four specialist brokers — each owning one micro-market completely. No territory overlap, no internal competition.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed">
                We're RERA registered, MahaRERA compliant, and proud to be one of the only agencies in Mumbai with a 98% client satisfaction rate backed by verified reviews.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-b-[3px] border-foreground">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex items-center gap-4">
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y-[3px] md:divide-y-0 md:divide-x-[3px] divide-foreground/15">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`px-6 md:px-10 py-8 md:py-10 ${i >= 2 ? "border-t-[3px] border-foreground/15" : ""}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-mono font-bold text-primary text-sm">0{i + 1}</span>
                  <h3 className="font-sans font-bold text-xl">{v.title}</h3>
                </div>
                <p className="font-sans text-muted-foreground leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
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
