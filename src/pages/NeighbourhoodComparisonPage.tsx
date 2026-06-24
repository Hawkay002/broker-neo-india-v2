import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { ArrowLeft, X, Check, Minus } from "lucide-react";
import { Link } from "wouter";
import { neighbourhoods, listings } from "@/data";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";

const NEIGHBOURHOOD_OPTIONS = neighbourhoods.map((n) => ({ value: n.slug, label: n.name }));

function getNeighbourhoodStats(slug: string) {
  const hoodListings = listings.filter((l) => l.neighborhoodSlug === slug);
  const avgPrice = hoodListings.length
    ? Math.round(hoodListings.reduce((sum, l) => sum + parseInt(l.price.replace(/[₹,]/g, "")) / (l.sqft ? parseInt(l.sqft.replace(/,/g, "")) : 1), 0) / hoodListings.length)
    : 0;
  const avgSize = hoodListings.length
    ? Math.round(hoodListings.reduce((sum, l) => sum + parseInt(l.sqft.replace(/,/g, "")), 0) / hoodListings.length)
    : 0;
  return { count: hoodListings.length, avgPrice, avgSize };
}

function scoreNeighbourhood(slug: string): { transit: number; dining: number; schools: number; greenSpace: number; luxury: number; value: number } {
  const scores: Record<string, any> = {
    "worli": { transit: 7, dining: 6, schools: 8, greenSpace: 6, luxury: 9, value: 5 },
    "bandra-west": { transit: 8, dining: 10, schools: 7, greenSpace: 5, luxury: 7, value: 6 },
    "malabar-hill": { transit: 5, dining: 4, schools: 9, greenSpace: 8, luxury: 10, value: 3 },
    "lower-parel": { transit: 9, dining: 9, schools: 5, greenSpace: 3, luxury: 8, value: 7 },
    "juhu": { transit: 6, dining: 8, schools: 6, greenSpace: 7, luxury: 6, value: 6 },
    "powai": { transit: 5, dining: 5, schools: 8, greenSpace: 9, luxury: 5, value: 8 },
  };
  return scores[slug] || { transit: 5, dining: 5, schools: 5, greenSpace: 5, luxury: 5, value: 5 };
}

function Selector({
  selected,
  onChange,
  availableOptions,
}: {
  selected: string[];
  onChange: (s: string[]) => void;
  availableOptions: { value: string; label: string }[];
}) {
  const options = availableOptions.filter((o) => !selected.includes(o.value) || selected.length >= 3);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else if (selected.length < 3) {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={`font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-3.5 py-2 border-2 transition-all cursor-pointer ${
              isActive
                ? "bg-foreground text-card border-foreground"
                : "bg-transparent text-foreground border-foreground/30 hover:border-primary"
            }`}
          >
            {opt.label}
            {isActive && <X className="w-3 h-3 inline-block ml-1.5" />}
          </button>
        );
      })}
    </div>
  );
}

export default function NeighbourhoodComparisonPage() {
  const [selected, setSelected] = useState<string[]>(["worli", "bandra-west", "malabar-hill"]);

  const stats = useMemo(() => {
    return selected.map((slug) => {
      const hood = neighbourhoods.find((n) => n.slug === slug);
      const hoodStats = getNeighbourhoodStats(slug);
      const scores = scoreNeighbourhood(slug);
      return { slug, hood, ...hoodStats, scores };
    });
  }, [selected]);

  const radarData = useMemo(() => {
    const metrics = ["transit", "dining", "schools", "greenSpace", "luxury", "value"];
    const labels: Record<string, string> = {
      transit: "Transit",
      dining: "Dining & Nightlife",
      schools: "Schools & Education",
      greenSpace: "Green Space",
      luxury: "Luxury Living",
      value: "Value for Money",
    };
    return metrics.map((metric) => {
      const entry: any = { metric: labels[metric] };
      selected.forEach((slug) => {
        const s = scoreNeighbourhood(slug);
        entry[slug] = s[metric as keyof typeof s];
      });
      return entry;
    });
  }, [selected]);

  const COLORS = ["#c6633f", "#2D2318", "#6B8E6B", "#B8860B"];

  return (
    <div className="pt-20">
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex items-center justify-between">
          <Link href="/" className="section-label text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <span className="section-label text-muted-foreground">Compare Neighbourhoods</span>
        </div>

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-8 md:py-12 bg-primary text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="section-label text-primary-foreground/70 mb-2">BRUT Realty</p>
            <h1 className="font-sans font-extrabold leading-[0.95] tracking-tight text-balance" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
              Compare<br />Neighbourhoods
            </h1>
            <p className="font-sans text-base md:text-lg text-primary-foreground/80 mt-4 max-w-xl leading-relaxed">
              Select up to 3 neighbourhoods to compare side by side.
            </p>
          </motion.div>
        </section>

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-6">
          <p className="section-label text-muted-foreground mb-3">Select Neighbourhoods</p>
          <Selector selected={selected} onChange={setSelected} availableOptions={NEIGHBOURHOOD_OPTIONS} />
        </section>

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Radar Chart */}
            <div className="border-2 border-foreground/15 p-5">
              <h3 className="font-sans font-bold text-base mb-4">Quality of Life Score</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(20 22% 14% / 0.15)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 9 }} />
                    {selected.map((slug, i) => {
                      const hood = neighbourhoods.find((n) => n.slug === slug);
                      return (
                        <Radar
                          key={slug}
                          name={hood?.name || slug}
                          dataKey={slug}
                          stroke={COLORS[i]}
                          fill={COLORS[i]}
                          fillOpacity={0.1}
                        />
                      );
                    })}
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table comparison */}
            <div className="border-2 border-foreground/15 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-xs">
                  <thead>
                    <tr className="border-b-2 border-foreground bg-muted/50">
                      <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[9px]">Metric</th>
                      {stats.map((s) => (
                        <th key={s.slug} className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[9px]">
                          {s.hood?.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Vibe", render: (s: any) => s.hood?.vibe.slice(0, 2).join(", ") },
                      { label: "Avg. Rent", render: (s: any) => s.hood?.avgRent },
                      { label: "Avg. Price", render: (s: any) => s.hood?.avgPrice },
                      { label: "Active Listings", render: (s: any) => s.count },
                      { label: "Avg. Sq.ft.", render: (s: any) => s.avgSize ? `${s.avgSize.toLocaleString()} sq.ft.` : "—" },
                    ].map(({ label, render }) => (
                      <tr key={label} className="border-b border-foreground/10">
                        <td className="px-4 py-3 font-bold text-[10px] uppercase tracking-wider">{label}</td>
                        {stats.map((s) => (
                          <td key={s.slug} className="px-4 py-3">{render(s)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed view */}
        <section className="px-5 md:px-10 py-10">
          <h2 className="font-sans font-extrabold text-2xl tracking-tight mb-6">Spotlight</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <div key={s.slug} className="border-2 border-foreground bg-card overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={s.hood?.image} alt={s.hood?.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 border-t-[3px] border-foreground">
                  <p className="section-label text-primary mb-1">{s.hood?.tagline}</p>
                  <h3 className="font-sans font-bold text-xl mb-2">{s.hood?.name}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{s.hood?.blurb}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.hood?.vibe.map((v) => (
                      <span key={v} className="font-mono text-[8px] uppercase tracking-wider font-bold px-2 py-1 bg-muted text-muted-foreground">
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {s.hood?.highlights.map((h) => (
                      <div key={h.label} className="flex items-center justify-between text-xs border-b border-foreground/10 pb-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{h.label}</span>
                        <span className="font-sans font-medium">{h.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/neighbourhoods/${s.slug}`}
                    className="mt-4 btn-fill-primary bg-transparent text-foreground font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-4 py-2.5 border-2 border-foreground/40 cursor-pointer inline-flex items-center justify-between w-full"
                  >
                    Explore {s.hood?.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}