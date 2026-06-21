import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const NAV_ITEMS = ["Listings", "Gallery", "Brokers", "Process", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/" || location === "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navHref = (item: string) =>
    isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`;

  return (
    <>
      {/* Fixed header */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 bg-card border-b-[3px] border-foreground transition-all duration-200 ${
          scrolled ? "shadow-[0_4px_0_0_#2D2318]" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0 cursor-pointer flex-shrink-0">
            <span className="font-sans font-extrabold text-[22px] tracking-[-0.04em] text-foreground leading-none">
              BRUT
            </span>
            <div className="mx-3 w-[3px] h-5 bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.32em] font-medium text-muted-foreground mt-[1px]">
              REALTY
            </span>
          </Link>

          {/* Nav — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={navHref(item)}
                className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold px-4 py-2 relative group"
              >
                <span className="relative z-10 transition-colors duration-150 group-hover:text-primary-foreground">
                  {item}
                </span>
                <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
              </a>
            ))}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-4">
            <span className="section-label text-muted-foreground hidden lg:block">Est. 2009 · Mumbai</span>
            <a
              href={navHref("Contact")}
              className="btn-fill-dark bg-primary text-primary-foreground px-5 py-2.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 border-2 border-foreground bg-card cursor-pointer z-10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu — separate from header so it covers viewport */}
      {open && (
        <div className="fixed inset-0 z-40 bg-foreground flex flex-col pt-[68px]" style={{ overscrollBehavior: "contain" }}>
          <nav className="flex flex-col px-8 pt-10 gap-0 flex-1 overflow-y-auto">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item}
                href={navHref(item)}
                className="font-sans font-extrabold text-[clamp(36px,10vw,52px)] uppercase text-card hover:text-primary transition-colors py-3 border-b border-card/10"
                style={{ transitionDelay: `${i * 30}ms` }}
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href={navHref("Contact")}
              className="btn-fill-dark mt-8 bg-primary text-primary-foreground px-6 py-4 font-bold border-2 border-primary-foreground/20 uppercase tracking-widest text-sm text-left inline-block cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Book a Call →
            </a>
          </nav>

          {/* Bottom info strip */}
          <div className="px-8 py-5 border-t border-card/10 flex items-center justify-between flex-shrink-0">
            <span className="section-label text-card/25">Est. 2009 · Mumbai</span>
            <span className="section-label text-primary">RERA Registered</span>
          </div>
        </div>
      )}
    </>
  );
}
