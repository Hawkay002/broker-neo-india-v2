import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We spend 30 minutes understanding exactly what you need — budget, timeline, lifestyle. No pressure, no pitch.",
    detail: "Same-day callback · Mon–Sat 9am–8pm IST",
  },
  {
    number: "02",
    title: "Curated Matches",
    description: "We send you 3–5 properties maximum. All pre-vetted, all within your criteria. No scrolling through 200 listings.",
    detail: "Delivered within 48 hours · Off-market options included",
  },
  {
    number: "03",
    title: "Private Viewings",
    description: "We arrange private showings on your schedule. No open houses. No other buyers. Just you and the property.",
    detail: "Exclusive access · BRUT broker present",
  },
  {
    number: "04",
    title: "Negotiation & Close",
    description: "We negotiate hard on your behalf. Price, terms, possession timeline — everything. We don't stop at the first offer.",
    detail: "Legal support included · Registration assistance",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-foreground border-b-[3px] border-foreground overflow-hidden">
      {/* Header */}
      <div className="border-b-[3px] border-card/20 px-5 md:px-10 py-4 flex items-center gap-4">
        <span className="section-label text-card/30">05 /</span>
        <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight text-card">How It Works</h2>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-[3px] md:divide-y-0 md:divide-x-[3px] divide-card/15">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="px-6 py-8 md:py-10 flex flex-col gap-4 relative group"
          >
            {/* Step number */}
            <div className="flex items-start justify-between">
              <span
                className="font-sans font-extrabold stroke-cream leading-none select-none"
                style={{ fontSize: "clamp(52px, 6vw, 80px)", WebkitTextStroke: "2px rgba(248,245,240,0.15)" }}
              >
                {step.number}
              </span>
              {/* Animated dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300 }}
                className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-bold text-lg md:text-xl text-card leading-tight">{step.title}</h3>
              <p className="font-sans text-sm text-card/60 leading-relaxed">{step.description}</p>
            </div>

            <div className="mt-auto pt-3 border-t border-card/10">
              <p className="section-label text-primary">{step.detail}</p>
            </div>

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="border-t-[3px] border-card/15 px-5 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-sans text-card/50 text-sm">
          Average time from first call to signed agreement: <span className="font-bold text-card">11 days.</span>
        </p>
        <a
          href="#contact"
          className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3 font-bold border-2 border-primary-foreground/20 uppercase tracking-widest text-xs cursor-pointer inline-block"
        >
          Start the Process →
        </a>
      </div>
    </section>
  );
}
