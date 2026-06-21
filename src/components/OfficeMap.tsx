import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Bus, Train, Footprints, Navigation } from "lucide-react";

type RouteType = "bus" | "train" | "foot" | null;

export default function OfficeMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteType>(null);

  const OFFICE_COORDS: [number, number] = [72.8265, 18.9968]; // [lng, lat] for MapLibre

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json", // Standard open style
      center: OFFICE_COORDS,
      zoom: 15,
      pitch: 45, // 3D perspective
      bearing: -15,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      // Custom Marker for Office
      const el = document.createElement("div");
      el.className = "brut-marker";
      el.innerHTML = `
        <div style="
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
        ">B</div>
      `;

      new maplibregl.Marker({ element: el })
        .setLngLat(OFFICE_COORDS)
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML(`
              <div style="font-family:'Space Grotesk',sans-serif;padding:6px 2px;">
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
              </div>
            `)
        )
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const fetchRoute = async (type: RouteType) => {
    if (!type) return;
    setActiveRoute(type);

    const startCoords: [number, number] = [72.8300, 18.9900];
    const profile = type === "foot" ? "foot" : type === "train" ? "car" : "car";
    
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/${profile}/${startCoords[0]},${startCoords[1]};${OFFICE_COORDS[0]},${OFFICE_COORDS[1]}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      const route = data.routes[0].geometry;

      if (!mapRef.current) return;

      if (mapRef.current.getSource("route")) {
        mapRef.current.removeLayer("route-line");
        mapRef.current.removeSource("route");
      }

      mapRef.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: route,
        },
      });

      mapRef.current.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": type === "bus" ? "#c6633f" : type === "train" ? "#2D2318" : "#f8f5f0",
          "line-width": 4,
        },
      });

      const bounds = new maplibregl.LngLatBounds();
      route.coordinates.forEach((coord: [number, number]) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds, { padding: 50, duration: 1000 });

    } catch (e) {
      console.error("Routing error:", e);
    }
  };

  return (
    <div className="w-full border-t-[3px] border-foreground relative">
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => fetchRoute("bus")}
          className={`p-2 border-2 border-foreground bg-card cursor-pointer transition-all bs-hover flex items-center gap-2 ${
            activeRoute === "bus" ? "bg-primary text-primary-foreground border-primary" : "text-foreground"
          }`}
          title="Bus Route"
        >
          <Bus className="w-4 h-4" />
          <span className="hidden md:block font-mono text-[10px] uppercase font-bold">Bus</span>
        </button>
        <button
          onClick={() => fetchRoute("train")}
          className={`p-2 border-2 border-foreground bg-card cursor-pointer transition-all bs-hover flex items-center gap-2 ${
            activeRoute === "train" ? "bg-primary text-primary-foreground border-primary" : "text-foreground"
          }`}
          title="Train Route"
        >
          <Train className="w-4 h-4" />
          <span className="hidden md:block font-mono text-[10px] uppercase font-bold">Train</span>
        </button>
        <button
          onClick={() => fetchRoute("foot")}
          className={`p-2 border-2 border-foreground bg-card cursor-pointer transition-all bs-hover flex items-center gap-2 ${
            activeRoute === "foot" ? "bg-primary text-primary-foreground border-primary" : "text-foreground"
          }`}
          title="Walk Route"
        >
          <Footprints className="w-4 h-4" />
          <span className="hidden md:block font-mono text-[10px] uppercase font-bold">Walk</span>
        </button>
        <button
          onClick={() => {
            setActiveRoute(null);
            if (mapRef.current?.getSource("route")) {
              mapRef.current.removeLayer("route-line");
              mapRef.current.removeSource("route");
            }
            mapRef.current?.flyTo({ center: OFFICE_COORDS, zoom: 15, pitch: 45, duration: 1000 });
          }}
          className="p-2 border-2 border-foreground bg-card cursor-pointer transition-all bs-hover text-foreground flex items-center gap-2"
          title="Reset View"
        >
          <Navigation className="w-4 h-4" />
          <span className="hidden md:block font-mono text-[10px] uppercase font-bold">Reset</span>
        </button>
      </div>

      <div
        ref={mapContainerRef}
        className="w-full"
        style={{ height: "clamp(260px, 38vw, 420px)" }}
      />
      
      <div className="absolute top-3 left-3 z-[1000] bg-foreground text-card font-mono text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] pointer-events-none">
        Lower Parel · Mumbai
      </div>
    </div>
  );
}
