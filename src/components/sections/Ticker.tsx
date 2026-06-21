const ROW_1 = ["500+ PROPERTIES SOLD", "₹1,200 CR+ VOLUME", "98% CLIENT SATISFACTION", "15+ YEARS ACTIVE", "OFF-MARKET ACCESS", "SAME-DAY RESPONSE", "RERA REGISTERED", "MUMBAI'S FINEST"];
const ROW_2 = ["WORLI", "BANDRA WEST", "LOWER PAREL", "MALABAR HILL", "JUHU", "POWAI", "ANDHERI WEST", "COLABA", "BKC", "PAREL"];

function Track({ items, reverse = false, speed = "30s" }: { items: string[]; reverse?: boolean; speed?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={reverse ? "marquee-r" : "marquee-l"}
        style={{ animationDuration: speed, display: "inline-flex" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="border-b-[3px] border-foreground bg-foreground text-card overflow-hidden select-none">
      {/* Row 1 */}
      <div className="border-b-2 border-card/10 py-2.5 font-mono font-bold text-[11px] tracking-[0.22em] uppercase text-card/70">
        <Track items={ROW_1} speed="38s" />
      </div>
      {/* Row 2 */}
      <div className="py-2.5 font-sans font-extrabold tracking-[-0.02em] text-card/90" style={{ fontSize: "clamp(11px, 1.5vw, 13px)" }}>
        <Track items={ROW_2} reverse speed="22s" />
      </div>
    </div>
  );
}
