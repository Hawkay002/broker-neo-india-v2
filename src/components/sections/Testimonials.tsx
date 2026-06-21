import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data";
import { useState } from "react";
import { Quote } from "lucide-react";
import { ParticleField } from "@/components/Scene3D";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section id="testimonials" className="bg-card border-b-[3px] border-foreground relative overflow-hidden">
      {/* 3D Particle Accent - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 pointer-events-none z-0 opacity-40">
        <ParticleField count={30} color="#2D2318" />
      </div>

      {/* Header */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex items-center gap-4 relative z-10">
        <span className="section-label text-muted-foreground">06 /</span>
        <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">What Clients Say</h2>
      </div>

      <div className="flex flex-col lg:flex-row relative z-10">
        {/* Left — main quote */}
        <div className="lg:flex-1 px-5 md:px-10 py-10 md:py-16 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-foreground flex flex-col justify-between">
          {/* Quote icon — large, rotated 180° */}
          <Quote
            aria-hidden
            className="text-foreground/10 mb-4 flex-shrink-0"
            style={{
              width: "clamp(80px, 10vw, 110px)",
              height: "clamp(80px, 10vw, 110px)",
              transform: "rotate(180deg)",
              transformOrigin: "center",
            }}
            strokeWidth={2.5}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-6"
            >
              <blockquote
                className="font-sans font-bold leading-tight text-foreground"
                style={{ fontSize: "clamp(22px, 3.5vw, 38px)" }}
              >
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-8 h-[3px] bg-primary" />
                <div>
                  <p className="font-sans font-bold text-sm">{t.name}</p>
                  <p className="section-label text-muted-foreground">{t.property}</p>
                </div>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-primary text-base">★</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right — testimonial list */}
        <div className="lg:w-[360px] xl:w-[400px] flex flex-col divide-y-[3px] divide-foreground/15">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(i)}
              className={`group text-left px-5 md:px-8 py-5 flex items-start gap-4 transition-colors duration-200 cursor-pointer w-full ${
                i === active ? "bg-foreground text-card" : "bg-transparent hover:bg-muted"
              }`}
            >
              {/* Right-side quote mark — rotated 180° (mirrored closing-quote look) */}
              <Quote
                aria-hidden
                className="flex-shrink-0"
                style={{
                  width: "24px",
                  height: "24px",
                  transform: "rotate(180deg)",
                  transformOrigin: "center",
                  color: i === active ? "hsl(14 56% 49%)" : "rgba(45,35,24,0.18)",
                }}
                strokeWidth={2.5}
              />
              <div className="flex flex-col gap-1 min-w-0">
                <p className={`font-bold text-sm truncate ${i === active ? "text-card" : "text-foreground"}`}>
                  {item.name}
                </p>
                <p className={`section-label truncate ${i === active ? "text-card/50" : "text-muted-foreground"}`}>
                  {item.property}
                </p>
              </div>
            </button>
          ))}

          {/* CTA at bottom */}
          <div className="mt-auto px-5 md:px-8 py-5 bg-background">
            <a
              href="#contact"
              className="btn-fill-dark bg-primary text-primary-foreground px-5 py-2.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block w-full text-center"
            >
              Get Your Result →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
