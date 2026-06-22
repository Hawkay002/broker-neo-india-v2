import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Bus, Train, Footprints, Navigation } from "lucide-react";

type RouteType = "bus" | "train" | "foot" | null;

const OFFICE_COORDS: [number, number] = [72.8265, 18.9968];

const TRANSIT_STOPS = {
  bus: {
    name: "Senapati Bapat Marg Bus Stop",
    subtitle: "Nearest bus stop · ~2 min walk",
    coords: [72.8270, 18.9955] as [number, number],
    color: "#c6633f",
    label: "BUS",
  },
  train: {
    name: "Lower Parel Railway Station",
    subtitle: "Western Railway · ~8 min walk",
    coords: [72.8315, 18.9941] as [number, number],
    color: "#2D2318",
    label: "TRN",
  },
};

export default function OfficeMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const transitMarkerRef = useRef<maplibregl.Marker | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteType>(null);
  const [footInfo, setFootInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: OFFICE_COORDS,
      zoom: 15,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
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

  const clearOverlays = () => {
    if (transitMarkerRef.current) {
      transitMarkerRef.current.remove();
      transitMarkerRef.current = null;
    }
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    const map = mapRef.current;
    if (map?.getSource("route")) {
      map.removeLayer("route-line");
      map.removeSource("route");
    }
    setFootInfo(null);
    setGeoStatus("idle");
  };

  const showTransitStop = (type: "bus" | "train") => {
    clearOverlays();
    setActiveRoute(type);

    const map = mapRef.current;
    if (!map) return;

    const stop = TRANSIT_STOPS[type];

    const el = document.createElement("div");
    el.innerHTML = `<div style="
      width:38px;height:38px;
      background:${stop.color};
      border:3px solid #2D2318;
      box-shadow:3px 3px 0 #2D2318;
      display:flex;align-items:center;justify-content:center;
      font-family:'DM Mono',monospace;
      font-weight:700;font-size:9px;
      color:#F8F5F0;
      letter-spacing:0.1em;
      cursor:pointer;
    ">${stop.label}</div>`;

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat(stop.coords)
      .setPopup(
        new maplibregl.Popup({ offset: 25 }).setHTML(`
          <div style="font-family:'Space Grotesk',sans-serif;padding:6px 2px;">
            <strong style="font-size:13px;display:block;margin-bottom:4px;color:#2D2318;">${stop.name}</strong>
            <span style="font-size:11px;color:#7a6a5a;font-family:'DM Mono',monospace;">${stop.subtitle}</span>
          </div>
        `)
      )
      .addTo(map);

    marker.togglePopup();
    transitMarkerRef.current = marker;

    const bounds = new maplibregl.LngLatBounds();
    bounds.extend(OFFICE_COORDS);
    bounds.extend(stop.coords);
    map.fitBounds(bounds, { padding: 100, duration: 800 });
  };

  const showFootRoute = () => {
    clearOverlays();
    setActiveRoute("foot");
    setGeoStatus("loading");

    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userCoords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        const map = mapRef.current;
        if (!map) return;

        const userEl = document.createElement("div");
        userEl.innerHTML = `<div style="
          width:36px;height:36px;
          background:#F8F5F0;
          border:3px solid #2D2318;
          box-shadow:3px 3px 0 #2D2318;
          display:flex;align-items:center;justify-content:center;
          font-family:'DM Mono',monospace;
          font-weight:700;font-size:8px;
          color:#2D2318;
          letter-spacing:0.08em;
        ">YOU</div>`;

        const userMarker = new maplibregl.Marker({ element: userEl })
          .setLngLat(userCoords)
          .setPopup(
            new maplibregl.Popup({ offset: 20 }).setHTML(`
              <div style="font-family:'Space Grotesk',sans-serif;padding:4px 2px;">
                <strong style="font-size:12px;color:#2D2318;">Your Location</strong>
              </div>
            `)
          )
          .addTo(map);
        userMarkerRef.current = userMarker;

        try {
          const res = await fetch(
            `https://router.project-osrm.org/route/v1/foot/${userCoords[0]},${userCoords[1]};${OFFICE_COORDS[0]},${OFFICE_COORDS[1]}?overview=full&geometries=geojson`
          );
          const data = await res.json();
          const route = data.routes[0];
          const geom = route.geometry;
          const distM: number = route.distance;
          const durS: number = route.duration;

          const distStr =
            distM < 1000
              ? `${Math.round(distM)} m`
              : `${(distM / 1000).toFixed(1)} km`;
          const durStr =
            durS < 60
              ? `${Math.round(durS)} sec`
              : `${Math.round(durS / 60)} min walk`;

          setFootInfo({ distance: distStr, duration: durStr });
          setGeoStatus("idle");

          if (map.getSource("route")) {
            map.removeLayer("route-line");
            map.removeSource("route");
          }

          map.addSource("route", {
            type: "geojson",
            data: { type: "Feature", properties: {}, geometry: geom },
          });
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#F8F5F0", "line-width": 4, "line-opacity": 0.9 },
          });

          const bounds = new maplibregl.LngLatBounds();
          geom.coordinates.forEach((c: [number, number]) => bounds.extend(c));
          map.fitBounds(bounds, { padding: 60, duration: 1000 });
        } catch {
          setGeoStatus("error");
        }
      },
      () => {
        setGeoStatus("error");
      }
    );
  };

  const resetMap = () => {
    clearOverlays();
    setActiveRoute(null);
    mapRef.current?.flyTo({ center: OFFICE_COORDS, zoom: 15, duration: 1000 });
  };

  return (
    <div className="w-full border-t-[3px] border-foreground relative z-0 isolate">
      {/* Transit controls */}
      <div className="absolute bottom-3 left-3 z-[10] flex flex-col gap-2">
        <button
          onClick={() => showTransitStop("bus")}
          className={`p-2 border-2 border-foreground bg-card cursor-pointer transition-all bs-hover flex items-center gap-2 ${
            activeRoute === "bus" ? "bg-primary text-primary-foreground border-primary" : "text-foreground"
          }`}
          title="Nearest Bus Stop"
        >
          <Bus className="w-4 h-4" />
          <span className="hidden md:block font-mono text-[10px] uppercase font-bold">Bus Stop</span>
        </button>
        <button
          onClick={() => showTransitStop("train")}
          className={`p-2 border-2 border-foreground bg-card cursor-pointer transition-all bs-hover flex items-center gap-2 ${
            activeRoute === "train" ? "bg-primary text-primary-foreground border-primary" : "text-foreground"
          }`}
          title="Nearest Train Station"
        >
          <Train className="w-4 h-4" />
          <span className="hidden md:block font-mono text-[10px] uppercase font-bold">Train Stn</span>
        </button>
        <button
          onClick={showFootRoute}
          disabled={geoStatus === "loading"}
          className={`p-2 border-2 border-foreground bg-card cursor-pointer transition-all bs-hover flex items-center gap-2 ${
            activeRoute === "foot" ? "bg-primary text-primary-foreground border-primary" : "text-foreground"
          } ${geoStatus === "loading" ? "opacity-60 cursor-wait" : ""}`}
          title="Walk from my location"
        >
          <Footprints className="w-4 h-4" />
          <span className="hidden md:block font-mono text-[10px] uppercase font-bold">
            {geoStatus === "loading" ? "Locating…" : "Walk"}
          </span>
        </button>
        <button
          onClick={resetMap}
          className="p-2 border-2 border-foreground bg-card cursor-pointer transition-all bs-hover text-foreground flex items-center gap-2"
          title="Reset View"
        >
          <Navigation className="w-4 h-4" />
          <span className="hidden md:block font-mono text-[10px] uppercase font-bold">Reset</span>
        </button>
      </div>

      {/* Walking distance info panel */}
      {footInfo && (
        <div className="absolute bottom-3 right-3 z-[10] bg-foreground text-card px-4 py-3 border-2 border-primary">
          <p className="section-label text-card/50 mb-1">Walking from your location</p>
          <p className="font-sans font-extrabold text-xl leading-none text-primary">{footInfo.distance}</p>
          <p className="font-mono text-[10px] text-card/60 mt-1 uppercase tracking-[0.15em]">{footInfo.duration}</p>
        </div>
      )}

      {/* Geolocation error */}
      {geoStatus === "error" && (
        <div className="absolute bottom-3 right-3 z-[10] bg-foreground text-card px-4 py-3 border-2 border-foreground/40">
          <p className="font-mono text-[10px] text-card/60 uppercase tracking-[0.12em]">Location access denied</p>
          <p className="font-mono text-[9px] text-card/40 mt-0.5">Allow location in browser settings</p>
        </div>
      )}

      <div
        ref={mapContainerRef}
        className="w-full"
        style={{ height: "clamp(340px, 45vw, 560px)" }}
      />

      <div className="absolute top-3 left-3 z-[10] bg-foreground text-card font-mono text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] pointer-events-none">
        Lower Parel · Mumbai
      </div>
    </div>
  );
}
