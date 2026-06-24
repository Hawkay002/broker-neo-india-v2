import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";

const COVERAGE = [
  { outlet: "Economic Times", date: "March 2024", headline: "How BRUT Realty is disrupting Mumbai's luxury property market with a radical no-BS approach", type: "Feature" },
  { outlet: "Mumbai Mirror", date: "January 2024", headline: "This boutique broker closed ₹350 crore in deals last year — with just four agents", type: "Interview" },
  { outlet: "The Hindu BusinessLine", date: "October 2023", headline: "BRUT Realty's off-market listings model: the future of premium property brokerage in India", type: "Analysis" },
  { outlet: "Hindustan Times", date: "June 2023", headline: "Mumbai's new-age real estate firms prioritise client experience over volume — BRUT leads the way", type: "Report" },
  { outlet: "Mint", date: "February 2023", headline: "Meet the boutique agency changing how Mumbai's HNIs buy property", type: "Feature" },
];

export default function PressPage() {
  return (
    <div className="pt-20">
      <SEO
        title="Press & Media"
        description="BRUT Realty in the news — Economic Times, Mumbai Mirror, The Hindu BusinessLine, Hindustan Times, and Mint."
        path="/press"
      />
      <Navbar />
      <main className="bg-background min-h-screen">
        <section className="border-b-[3px] border-foreground">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3">
            <span className="section-label text-muted-foreground">Press & Media</span>
          </div>
          <div className="px-5 md:px-10 py-12 md:py-16">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-sans font-extrabold leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
            >
              In the <span className="stroke">press.</span>
            </motion.h1>
            <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
              For media enquiries, interviews or press kits, contact us at{" "}
              <a href="mailto:press@brutrealty.in" className="font-bold hover:text-primary transition-colors underline">press@brutrealty.in</a>
            </p>
          </div>
        </section>

        {/* Coverage list */}
        <section className="border-b-[3px] border-foreground">
          <div className="flex flex-col divide-y-[3px] divide-foreground/15">
            {COVERAGE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="px-5 md:px-10 py-6 flex flex-col md:flex-row md:items-start gap-4 hover:bg-muted transition-colors duration-200 group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 md:w-52 flex-shrink-0">
                  <span className="font-mono font-bold text-sm">{item.outlet}</span>
                  <span className="section-label text-muted-foreground">{item.date}</span>
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-3 justify-between">
                  <p className="font-sans text-sm md:text-base leading-relaxed flex-1 pr-4">
                    "{item.headline}"
                  </p>
                  <span className="bg-foreground text-card font-mono text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 self-start flex-shrink-0">
                    {item.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Press Kit CTA */}
        <section className="px-5 md:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-sans font-bold text-xl mb-1">Press Kit</h3>
            <p className="font-sans text-muted-foreground text-sm">Logos, brand assets, founder bios and high-res photography.</p>
          </div>
          <a
            href="mailto:press@brutrealty.in?subject=Press Kit Request"
            className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block"
          >
            Request Press Kit →
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
