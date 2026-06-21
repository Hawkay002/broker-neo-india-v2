import { motion } from "framer-motion";
import { ParticleField } from "@/components/Scene3D";

// Each step gets a distinct card colour from the BRUT palette:
//  white (cream card), black (foreground), terracotta (primary), offwhite (background).
type Tone = "cream" | "black" | "terracotta" | "offwhite";

const TONE_STYLES: Record<Tone, {
  bg: string;
  text: string;
  muted: string;
  numberSolid: string; // solid coloured number that complements the card
  numberStroke: string; // big outlined number overlay
  border: string;
  accent: string;
}> = {
  cream: {
    bg: "bg-card",
    text: "text-foreground",
    muted: "text-muted-foreground",
    numberSolid: "text-primary",
    numberStroke: "rgba(45,35,24,0.10)",
    border: "border-foreground",
    accent: "text-primary",
  },
  black: {
    bg: "bg-foreground",
    text: "text-card",
    muted: "text-card/60",
    numberSolid: "text-primary",
    numberStroke: "rgba(248,245,240,0.16)",
    border: "border-card/15",
    accent: "text-primary",
  },
  terracotta: {
    bg: "bg-primary",
    text: "text-primary-foreground",
    muted: "text-primary-foreground/75",
    numberSolid: "text-foreground",
    numberStroke: "rgba(248,245,240,0.22)",
    border: "border-primary-foreground/20",
    accent: "text-primary-foreground",
  },
  offwhite: {
    bg: "bg-background",
    text: "text-foreground",
    muted: "text-muted-foreground",
    numberSolid: "text-foreground",
    numberStroke: "rgba(45,35,24,0.08)",
    border: "border-foreground",
    accent: "text-primary",
  },
};

const STEPS: { number: string; title: string; description: string; detail: string; tone: Tone }[] = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We spend 30 minutes understanding exactly what you need — budget, timeline, lifestyle. No pressure, no pitch.",
    detail: "Same-day callback · Mon–Sat 9am–8pm IST",
    tone: "cream",
  },
  {
    number: "02",
    title: "Curated Matches",
    description: "We send you 3–5 properties maximum. All pre-vetted, all within your criteria. No scrolling through 200 listings.",
    detail: "Delivered within 48 hours · Off-market options included",
    tone: "black",
  },
  {
    number: "03",
    title: "Private Viewings",
    description: "We arrange private showings on your schedule. No open houses. No other buyers. Just you and the property.",
    detail: "Exclusive access · BRUT broker present",
    tone: "terracotta",
  },
  {
    number: "04",
    title: "Negotiation & Close",
    description: "We negotiate hard on your behalf. Price, terms, possession timeline — everything. We don't stop at the first offer.",
    detail: "Legal support included · Registration assistance",
    tone: "offwhite",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-background border-b-[3px] border-foreground overflow-hidden relative">
      {/* 3D Particle Accent - Top Right */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 pointer-events-none z-0 opacity-50">
        <ParticleField count={40} color="#c6633f" />
      </div>

      {/* Header */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex items-center gap-4 relative z-10">
        <span className="section-label text-muted-foreground">05 /</span>
        <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">How It Works</h2>
      </div>

      {/* Steps — 4 distinct coloured cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        {STEPS.map((step, i) => {
          const tone = TONE_STYLES[step.tone];
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative px-6 py-8 md:py-10 flex flex-col gap-4 ${tone.bg} ${tone.text} group overflow-hidden`}
            >
              {/* Big outlined number — top-right overlay */}
              <span
                aria-hidden
                className="absolute top-2 right-3 font-sans font-extrabold leading-none select-none pointer-events-none"
                style={{
                  fontSize: "clamp(110px, 11vw, 180px)",
                  WebkitTextStroke: `2.5px ${tone.numberStroke}`,
                  color: "transparent",
                  zIndex: 0,
                }}
              >
                {step.number}
              </span>

              {/* Content sits above the overlay */}
              <div className="relative z-10 flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  {/* Solid coloured number — complements the card colour */}
                  <span
                    className="font-sans font-extrabold leading-none select-none"
                    style={{ fontSize: "clamp(40px, 4vw, 56px)" }}
                  >
                    <span className={tone.numberSolid}>{step.number}</span>
                  </span>
                  {/* Animated dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300 }}
                    className={`w-3 h-3 rounded-full bg-primary flex-shrink-0 ${step.tone === "terracotta" ? "!bg-foreground" : ""}`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-sans font-bold text-lg md:text-xl leading-tight">{step.title}</h3>
                  <p className={`font-sans text-sm leading-relaxed ${tone.muted}`}>{step.description}</p>
                </div>

                <div className={`mt-auto pt-3 border-t ${tone.border} border-t-[1px]`}>
                  <p className={`section-label ${tone.accent}`}>{step.detail}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="border-t-[3px] border-foreground px-5 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card relative z-10">
        <p className="font-sans text-muted-foreground text-sm">
          Average time from first call to signed agreement: <span className="font-bold text-foreground">11 days.</span>
        </p>
        <a
          href="#contact"
          className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3 font-bold border-2 border-foreground uppercase tracking-widest text-xs cursor-pointer inline-block"
        >
          Start the Process →
        </a>
      </div>
    </section>
  );
}
