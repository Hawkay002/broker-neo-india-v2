import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const FEATURES = [
  { title: "Keyboard Navigation", body: "All interactive elements are accessible via keyboard. Use Tab to move between elements and Enter/Space to activate." },
  { title: "Screen Reader Support", body: "We use semantic HTML and ARIA labels to ensure compatibility with screen readers such as NVDA, JAWS, and VoiceOver." },
  { title: "Colour Contrast", body: "Our design maintains WCAG 2.1 AA contrast ratios across all text and interactive elements." },
  { title: "Text Scaling", body: "All text scales correctly up to 200% zoom without loss of content or functionality." },
  { title: "Focus Indicators", body: "Visible focus rings are present on all interactive elements for keyboard users." },
  { title: "Alt Text", body: "All meaningful images include descriptive alt text. Decorative images are marked appropriately." },
];

export default function AccessibilityPage() {
  return (
    <div className="pt-[68px]">
      <Navbar />
      <main className="bg-background min-h-screen">
        <section className="border-b-[3px] border-foreground">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3">
            <span className="section-label text-muted-foreground">Legal / Accessibility</span>
          </div>
          <div className="px-5 md:px-10 py-10 md:py-14">
            <h1 className="font-sans font-extrabold leading-tight tracking-tight mb-3" style={{ fontSize: "clamp(34px, 5vw, 64px)" }}>
              Accessibility Statement
            </h1>
            <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
              BRUT Realty is committed to ensuring brutrealty.in is accessible to all users, including those with disabilities. We aim to conform to WCAG 2.1 Level AA.
            </p>
          </div>
        </section>

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-10 md:py-14 max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 border-b border-foreground/10 pb-8">
              <h2 className="font-sans font-bold text-lg md:text-xl">Our Commitment</h2>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                We believe everyone deserves equal access to property information and services. We continually evaluate our website against WCAG 2.1 success criteria and work to remediate any issues found.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-b border-foreground/10 pb-8">
              <h2 className="font-sans font-bold text-lg md:text-xl">Accessibility Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {FEATURES.map((f) => (
                  <div key={f.title} className="border-2 border-foreground/15 bg-card p-4">
                    <h3 className="font-sans font-bold text-sm mb-1.5">{f.title}</h3>
                    <p className="font-sans text-muted-foreground text-sm leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-foreground/10 pb-8">
              <h2 className="font-sans font-bold text-lg md:text-xl">Known Limitations</h2>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                Our embedded map (powered by OpenStreetMap/Leaflet) may not be fully accessible to all screen reader users. If you need help locating our office, please call us at +91 22 4567 8900 and we will assist you directly.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-b border-foreground/10 pb-8">
              <h2 className="font-sans font-bold text-lg md:text-xl">Technical Standards</h2>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                This website is built with React and uses semantic HTML5, WAI-ARIA 1.2 roles and properties, and follows WCAG 2.1 Level AA guidelines to the best of our ability. We test using manual keyboard navigation, axe-core automated testing, and VoiceOver on macOS and iOS.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-sans font-bold text-lg md:text-xl">Feedback & Contact</h2>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                If you experience any accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <div className="flex flex-col gap-2 mt-1">
                {[
                  { label: "Email", value: "accessibility@brutrealty.in" },
                  { label: "Phone", value: "+91 22 4567 8900 (Mon–Sat, 9am–6pm IST)" },
                  { label: "Post", value: "Level 28, One World Center, S.B. Marg, Lower Parel West, Mumbai 400 013" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 items-start text-sm">
                    <span className="section-label text-muted-foreground w-14 flex-shrink-0 pt-0.5">{label}</span>
                    <span className="font-sans text-foreground">{value}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed mt-2">
                We aim to respond to all accessibility feedback within 5 business days.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t-[3px] border-foreground px-5 md:px-10 py-6 bg-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-muted-foreground text-sm">This statement was last reviewed on 1 June 2025.</p>
          <a
            href="mailto:accessibility@brutrealty.in"
            className="btn-fill-dark bg-primary text-primary-foreground px-5 py-2.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block"
          >
            Report an Issue →
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
