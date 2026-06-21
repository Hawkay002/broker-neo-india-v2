import { motion } from "framer-motion";
import { brokers } from "@/data";
import { useState } from "react";

function BrokerCard({ broker, index }: { broker: typeof brokers[0]; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-[3px] border-foreground bg-card group overflow-hidden flex flex-col bs"
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!imgLoaded && <div className="absolute inset-0 img-placeholder" />}
        <img
          src={broker.image}
          alt={broker.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Experience badge */}
        <div className="absolute top-3 right-3 bg-foreground text-card font-mono text-[9px] font-bold px-2 py-1 uppercase tracking-[0.18em]">
          {broker.experience}
        </div>
        {/* Specialty strip — slides up on hover, always visible on mobile */}
        <div className="broker-specialty absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="section-label text-primary-foreground/70 mb-0.5">Specialisation</p>
          <p className="font-bold text-sm">{broker.specialization}</p>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-4 border-t-[3px] border-foreground flex-1">
        <div>
          <p className="section-label text-muted-foreground mb-0.5">{broker.title}</p>
          <h3 className="font-sans font-bold text-lg leading-tight">{broker.name}</h3>
        </div>
        <a
          href="#contact"
          className="btn-fill-primary mt-auto bg-transparent text-foreground font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-4 py-2.5 border-2 border-foreground/40 cursor-pointer inline-flex items-center justify-between group/btn"
        >
          <span>Book a Call</span>
          <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Brokers() {
  return (
    <section id="brokers" className="bg-background border-b-[3px] border-foreground">
      {/* Header */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="section-label text-muted-foreground">04 /</span>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">Our Brokers</h2>
        </div>
        <p className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed">
          Each broker specialises in one area of the market. No generalists. No distractions.
        </p>
      </div>

      {/* Grid */}
      <div className="px-5 md:px-10 py-8 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {brokers.map((broker, i) => (
          <BrokerCard key={broker.id} broker={broker} index={i} />
        ))}
      </div>

      {/* Bottom strip */}
      <div className="border-t-[3px] border-foreground px-5 md:px-10 py-5 bg-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-card/50 uppercase tracking-[0.18em]">
          Every broker is RERA certified · MahaRERA compliant
        </p>
        <a
          href="#contact"
          className="btn-fill-primary-on-dark bg-foreground text-card font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-5 py-2.5 border-2 border-card/20 bs-cream bs-cream-hover cursor-pointer inline-block"
        >
          Meet the Full Team →
        </a>
      </div>
    </section>
  );
}
