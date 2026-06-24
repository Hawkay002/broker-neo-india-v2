import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import SEO from "@/components/SEO";

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
    <div className="pt-20">
      <SEO
        title="Accessibility Statement"
        description="BRUT Realty's commitment to ensuring brutrealty.in is accessible to all users, regardless of ability. WCAG 2.1 AA compliant."
        path="/accessibility"
      />
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <PageHero
          eyebrow="Legal / Accessibility"
          title="Accessibility"
          highlight="Statement"
          subtitle="Our commitment to ensuring brutrealty.in is accessible to all users, regardless of ability."
          crumb="Accessibility"
        />

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16 max-w-4xl">
          <RevealGroup stagger={0.08}>
            <div className="flex flex-col gap-12">
              <Reveal direction="up">
                <div className="flex flex-col gap-3">
                  <h2 className="font-sans font-extrabold text-2xl tracking-tight">Our Commitment</h2>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                    We believe everyone deserves equal access to property information and services. We continually evaluate our website against WCAG 2.1 success criteria and work to remediate any issues found.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="up">
                <div className="flex flex-col gap-3">
                  <h2 className="font-sans font-extrabold text-2xl tracking-tight mb-4">Accessibility Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FEATURES.map((f) => (
                      <div key={f.title} className="border-2 border-foreground/15 bg-card p-4 flex flex-col gap-2 bs">
                        <h3 className="font-sans font-bold text-sm">{f.title}</h3>
                        <p className="font-sans text-muted-foreground text-xs leading-relaxed">{f.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up">
                <div className="flex flex-col gap-3">
                  <h2 className="font-sans font-extrabold text-2xl tracking-tight">Known Limitations</h2>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                    Our embedded map may not be fully accessible to all screen reader users. If you need help locating our office, please call us at +91 22 4567 8900 and we will assist you directly.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="up">
                <div className="flex flex-col gap-3">
                  <h2 className="font-sans font-extrabold text-2xl tracking-tight">Technical Standards</h2>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                    This website is built with React and uses semantic HTML5, WAI-ARIA 1.2 roles and properties, and follows WCAG 2.1 Level AA guidelines. We test using manual keyboard navigation and axe-core automated testing.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="up">
                <div className="flex flex-col gap-3">
                  <h2 className="font-sans font-extrabold text-2xl tracking-tight">Feedback & Contact</h2>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-4">
                    If you experience any accessibility barriers or have suggestions for improvement, please contact us:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Email", value: "accessibility@brutrealty.in" },
                      { label: "Phone", value: "+91 22 4567 8900" },
                      { label: "Post", value: "One World Center, Mumbai" },
                    ].map(({ label, value }) => (
                      <div key={label} className="border-2 border-foreground/15 p-3 bg-card">
                        <span className="section-label text-muted-foreground block mb-1">{label}</span>
                        <span className="font-sans font-bold text-xs">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </RevealGroup>
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
