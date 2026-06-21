import { useEffect, useRef } from "react";

type LMap = { setView: (c: [number,number], z: number) => LMap; remove: () => void; };

export default function OfficeMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const init = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      if (!L || !containerRef.current) return;

      const map: LMap = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([18.9968, 72.8265], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:40px;height:40px;
          background:hsl(14,56%,49%);
          border:3px solid #2D2318;
          box-shadow:4px 4px 0 #2D2318;
          display:flex;align-items:center;justify-content:center;
          font-family:'Space Grotesk',sans-serif;
          font-weight:800;font-size:14px;
          color:#F8F5F0;
          transform:rotate(-5deg);
          cursor:pointer;
        ">B</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -42],
      });

      L.marker([18.9968, 72.8265], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:'Space Grotesk',sans-serif;padding:6px 2px;">
            <strong style="font-size:14px;display:block;margin-bottom:4px;color:#2D2318;">BRUT Realty</strong>
            <span style="font-size:11px;color:#7a6a5a;font-family:'DM Mono',monospace;display:block;line-height:1.6;">
              Level 28, One World Center<br/>
              S.B. Marg, Lower Parel West<br/>
              Mumbai 400 013, Maharashtra
            </span>
            <a href="https://maps.google.com/?q=One+World+Center+Lower+Parel+Mumbai"
               target="_blank" rel="noopener"
               style="display:inline-block;margin-top:8px;font-family:'DM Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:hsl(14,56%,49%);text-decoration:none;">
              Get Directions →
            </a>
          </div>`,
          { maxWidth: 260, minWidth: 220 }
        )
        .openPopup();

      mapRef.current = map;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).L) {
      init();
    } else {
      const timer = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).L) { clearInterval(timer); init(); }
      }, 80);
      return () => clearInterval(timer);
    }

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  return (
    <div className="w-full border-t-[3px] border-foreground relative">
      <div
        ref={containerRef}
        className="w-full"
        style={{ height: "clamp(260px, 38vw, 420px)" }}
      />
      {/* Brand overlay label */}
      <div className="absolute top-3 left-3 z-[1000] bg-foreground text-card font-mono text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] pointer-events-none">
        Lower Parel · Mumbai
      </div>
    </div>
  );
}
