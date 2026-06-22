import { Link } from "wouter";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useState, useRef } from "react";

const YEAR = new Date().getFullYear();

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Careers", href: "/careers" },
];

const SERVICES = [
  { label: "Premium Rentals", href: "/services/premium-rentals" },
  { label: "Property Purchase", href: "/services/property-purchase" },
  { label: "Off-Market Deals", href: "/services/off-market-deals" },
  { label: "Investment Consulting", href: "/services/investment-consulting" },
];

const NEIGHBOURHOODS = [
  { label: "Worli", href: "/neighbourhoods/worli" },
  { label: "Bandra West", href: "/neighbourhoods/bandra-west" },
  { label: "Malabar Hill", href: "/neighbourhoods/malabar-hill" },
  { label: "Lower Parel", href: "/neighbourhoods/lower-parel" },
  { label: "Juhu", href: "/neighbourhoods/juhu" },
  { label: "Powai", href: "/neighbourhoods/powai" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

const SOCIAL = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/brutrealty" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/brutrealty" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/brutrealty" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@brutrealty" },
];

// Image URLs from the data file (property images)
const FOOTER_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=85",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
  "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=85",
  "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=1200&q=85",
  "https://images.unsplash.com/photo-1613416295741-8e3b1a2a6c9e?w=1200&q=85",
  "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=85",
  "https://images.unsplash.com/photo-1605648916969-9f5a5a0a6c4a?w=1200&q=85",
];

// Long-press threshold in milliseconds
const LONG_PRESS_DURATION = 500;

function FooterLink({ href, label }: { href: string; label: string }) {
  const isInternal = href.startsWith("/") && !href.startsWith("/#");
  if (isInternal) {
    return (
      <Link to={href} className="font-sans text-sm text-card/55 hover:text-primary transition-colors duration-150 cursor-pointer block py-0.5 link-underline">
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className="font-sans text-sm text-card/55 hover:text-primary transition-colors duration-150 cursor-pointer block py-0.5 link-underline">
      {label}
    </a>
  );
}

// Letter mask component with image reveal on hover (desktop) or long-press (mobile)
function LetterMaskText({ text, images }: { text: string; images: string[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartTimeRef = useRef<number>(0);

  // Handle mouse enter (desktop hover)
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  // Handle mouse leave (desktop)
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Handle touch start (mobile)
  const handleTouchStart = (index: number) => {
    touchStartTimeRef.current = Date.now();
    
    touchTimerRef.current = setTimeout(() => {
      // Long press detected (500ms)
      setHoveredIndex(index);
    }, LONG_PRESS_DURATION);
  };

  // Handle touch end (mobile)
  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
    
    const touchDuration = Date.now() - touchStartTimeRef.current;
    
    // If it was a quick tap (less than 500ms), clear the hover state
    if (touchDuration < LONG_PRESS_DURATION) {
      setHoveredIndex(null);
    }
  };

  // Handle touch move (cancel long press if finger moves)
  const handleTouchMove = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      setHoveredIndex(null);
    }
  };

  return (
    <div className="select-none font-sans font-extrabold leading-none text-center w-full relative"
      style={{
        fontSize: "clamp(44px, 14vw, 160px)",
        letterSpacing: "0.08em",
      }}
    >
      <div className="flex justify-center gap-0">
        {text.split("").map((letter, index) => {
          const imageUrl = images[index % images.length];
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="relative cursor-pointer transition-all duration-300 select-none"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
              style={{
                position: "relative",
                display: "inline-block",
                userSelect: "none",
              }}
            >
              {/* Base outlined letter */}
              <span
                style={{
                  WebkitTextStroke: "1.5px rgba(248,245,240,0.38)",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  display: "inline-block",
                  transition: "all 0.3s ease",
                  opacity: isHovered ? 0 : 1,
                }}
              >
                {letter}
              </span>

              {/* Image-filled letter on hover/long-press */}
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "1em",
                    height: "1em",
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    WebkitTextStroke: "none",
                    display: "inline-block",
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  {letter}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-foreground text-card border-t-[3px] border-foreground">
      {/* Big CTA */}
      <div className="border-b-[3px] border-card/15 px-5 md:px-10 py-10 md:py-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2
            className="font-sans font-extrabold leading-tight tracking-tight"
            style={{ fontSize: "clamp(36px, 7vw, 80px)" }}
          >
            Ready to<br />
            <span style={{ WebkitTextStroke: "2px rgba(248,245,240,0.25)", WebkitTextFillColor: "transparent", color: "transparent" }}>
              find yours?
            </span>
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href="/#contact"
            className="btn-fill-dark bg-primary text-primary-foreground px-7 py-4 font-bold border-2 border-primary-foreground/20 bs-cream bs-cream-hover uppercase tracking-widest text-sm cursor-pointer inline-block"
          >
            Book a Call →
          </a>
          <p className="section-label text-card/25 text-right">Avg. response time: &lt;45 min</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="border-b-[3px] border-card/15 px-5 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-0 mb-2">
            <span className="font-sans font-extrabold text-[22px] tracking-[-0.04em] text-card leading-none">BRUT</span>
            <div className="mx-3 w-[3px] h-5 bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.32em] font-medium text-card/35 mt-[1px]">REALTY</span>
          </div>
          <p className="font-sans text-sm text-card/45 leading-relaxed max-w-[200px]">
            Mumbai's most direct real estate firm. Est. 2009.
          </p>
          <div className="flex gap-2 mt-2">
            {["IN", "MH", "BOM"].map((tag) => (
              <span key={tag} className="font-mono text-[9px] font-bold tracking-[0.2em] px-2 py-1 border border-card/15 text-card/30">
                {tag}
              </span>
            ))}
          </div>
          <p className="section-label text-card/20 mt-2">MahaRERA Reg. No.<br />P51800028099</p>

          {/* Social icons */}
          <div className="flex gap-3 mt-3">
            {SOCIAL.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 border border-card/20 flex items-center justify-center text-card/40 hover:text-primary hover:border-primary transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <h3 className="section-label text-card/30 mb-1">Company</h3>
          {COMPANY.map((l) => <FooterLink key={l.label} {...l} />)}
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          <h3 className="section-label text-card/30 mb-1">Services</h3>
          {SERVICES.map((l) => <FooterLink key={l.label} {...l} />)}
        </div>

        {/* Neighbourhoods */}
        <div className="flex flex-col gap-3">
          <h3 className="section-label text-card/30 mb-1">Neighbourhoods</h3>
          {NEIGHBOURHOODS.map((l) => <FooterLink key={l.label} {...l} />)}
        </div>
      </div>

      {/* BRUT / MUMBAI — full-width stacked watermark with image reveal on hover (desktop) or long-press (mobile) */}
      <div className="border-t-[3px] border-card/10 w-full overflow-hidden leading-none py-1">
        <div style={{ transform: "scaleX(1.32)", transformOrigin: "center" }}>
          <LetterMaskText text="BRUT" images={FOOTER_IMAGES} />
        </div>
        <div className="w-full border-t-[2px] border-card/20 my-1" aria-hidden="true" />
        <div style={{ transform: "scaleX(1.32)", transformOrigin: "center" }}>
          <LetterMaskText text="MUMBAI" images={FOOTER_IMAGES} />
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t-[3px] border-card/10 px-5 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="font-mono text-[10px] text-card/25 tracking-[0.12em]">
          © {YEAR} BRUT Realty Pvt. Ltd. · All rights reserved · Mumbai, Maharashtra
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          {LEGAL.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="font-mono text-[10px] text-card/30 hover:text-primary transition-colors duration-150 tracking-[0.12em] cursor-pointer"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
