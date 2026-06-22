import { Link } from "wouter";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

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

      {/* BRUT / MUMBAI — full-width stacked watermark above legal */}
      <div className="border-t-[3px] border-card/10 w-full overflow-hidden leading-none py-1">
        <div style={{ transform: "scaleX(1.32)", transformOrigin: "center" }}>
          <p
            className="select-none font-sans font-extrabold leading-none text-center w-full"
            style={{
              fontSize: "clamp(44px, 14vw, 160px)",
              letterSpacing: "0.08em",
              WebkitTextStroke: "1.5px rgba(248,245,240,0.38)",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
            aria-hidden="true"
          >
            BRUT
          </p>
        </div>
        <div className="w-full border-t-[2px] border-card/20 my-1" aria-hidden="true" />
        <div style={{ transform: "scaleX(1.32)", transformOrigin: "center" }}>
          <p
            className="select-none font-sans font-extrabold leading-none text-center w-full"
            style={{
              fontSize: "clamp(44px, 14vw, 160px)",
              letterSpacing: "0.08em",
              WebkitTextStroke: "1.5px rgba(248,245,240,0.38)",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
            aria-hidden="true"
          >
            MUMBAI
          </p>
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
