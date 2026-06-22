import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Magnetic from "@/components/Magnetic";

// Section anchors scroll within the home page.
// Page links route to dedicated pages (which scroll to top via ScrollToTop).
type NavItem = { label: string; href: string; type: "section" | "page" };

const NAV_ITEMS: NavItem[] = [
  { label: "About Us", href: "/about", type: "page" },
  { label: "Our Story", href: "/our-story", type: "page" },
  { label: "Listings", href: "listings", type: "section" },
  { label: "Gallery", href: "gallery", type: "section" },
  { label: "Brokers", href: "brokers", type: "section" },
  { label: "Process", href: "process", type: "section" },
  { label: "Contact", href: "contact", type: "section" },
];

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

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Resolve a nav item's destination.
  // Page items go to their route (ScrollToTop handles the reset).
  // Section items scroll within home, or jump home then scroll if elsewhere.
  const resolveHref = (item: NavItem) => {
    if (item.type === "page") return item.href;
    if (isHome) return `#${item.href}`;
    return `/#${item.href}`;
  };

  // Page items vs section items, with a separator between the two groups.
  const pageItems = NAV_ITEMS.filter((i) => i.type === "page");
  const sectionItems = NAV_ITEMS.filter((i) => i.type === "section");

  const isActivePage = (href: string) => location === href || location === href + "/";

  return (
    <>
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
            {/* Page links (About Us, Our Story) */}
            {pageItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-3.5 py-2 relative group ${
                    isActivePage(item.href) ? "text-gold" : ""
                  }`}
                >
                  <span className="relative z-10 transition-colors duration-150 group-hover:text-primary-foreground">
                    {item.label}
                  </span>
                  <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-[250ms] origin-left" />
                </Link>
            ))}

            {/* Separator */}
            <span aria-hidden className="w-px h-4 bg-foreground/25 mx-1" />

            {/* Section links */}
            {sectionItems.map((item) => (
              <a
                key={item.label}
                href={resolveHref(item)}
                className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-3.5 py-2 relative group"
              >
                <span className="relative z-10 transition-colors duration-150 group-hover:text-primary-foreground">
                  {item.label}
                </span>
                <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-[250ms] origin-left" />
              </a>
            ))}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-4">
            <span className="section-label text-muted-foreground hidden lg:block">Est. 2009 · Mumbai</span>
              <Magnetic>
                <a
                  href={isHome ? "#contact" : "/#contact"}
                  className="btn-fill-dark bg-primary text-primary-foreground px-5 py-2.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer"
                >
                  Book a Call
                </a>
              </Magnetic>
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

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-foreground flex flex-col pt-[68px]" style={{ overscrollBehavior: "contain" }}>
          <nav className="flex flex-col px-8 pt-10 gap-0 flex-1 overflow-y-auto">
            {NAV_ITEMS.map((item, i) =>
              item.type === "page" ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="font-sans font-extrabold text-[clamp(36px,10vw,52px)] uppercase text-card hover:text-primary transition-colors py-3 border-b border-card/10"
                  style={{ transitionDelay: `${i * 30}ms` }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={resolveHref(item)}
                  className="font-sans font-extrabold text-[clamp(36px,10vw,52px)] uppercase text-card hover:text-primary transition-colors py-3 border-b border-card/10"
                  style={{ transitionDelay: `${i * 30}ms` }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href={isHome ? "#contact" : "/#contact"}
              className="btn-fill-dark mt-8 bg-primary text-primary-foreground px-6 py-4 font-bold border-2 border-primary-foreground/20 uppercase tracking-widest text-sm text-left inline-block cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Book a Call →
            </a>
          </nav>

          <div className="px-8 py-5 border-t border-card/10 flex items-center justify-between flex-shrink-0">
            <span className="section-label text-card/25">Est. 2009 · Mumbai</span>
            <span className="section-label text-primary">RERA Registered</span>
          </div>
        </div>
      )}
    </>
  );
}
