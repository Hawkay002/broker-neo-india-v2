import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const ROLES = [
  {
    title: "Senior Broker — Bandra & Juhu",
    type: "Full-Time · On-Site",
    location: "Mumbai, Maharashtra",
    summary: "Lead client engagements across Bandra West and Juhu. 5+ years luxury real estate experience required. RERA certification mandatory.",
  },
  {
    title: "Client Experience Associate",
    type: "Full-Time · On-Site",
    location: "Lower Parel, Mumbai",
    summary: "First point of contact for all inbound enquiries. Exceptional communication, fast response time, CRM experience preferred.",
  },
  {
    title: "Junior Broker — Worli & Lower Parel",
    type: "Full-Time · On-Site",
    location: "Mumbai, Maharashtra",
    summary: "Support senior brokers on high-value transactions. 1–3 years experience. RERA certification or willingness to obtain within 3 months.",
  },
];

const PERKS = [
  { title: "Performance Bonuses", body: "Industry-leading commission structure with uncapped earnings." },
  { title: "Market Training", body: "Weekly micro-market briefings and quarterly strategy sessions." },
  { title: "Health Insurance", body: "Comprehensive health coverage for you and your family." },
  { title: "Flexible Hours", body: "Client-first scheduling. No pointless desk time." },
  { title: "Mumbai Allowance", body: "Travel and entertainment allowance for client meetings." },
  { title: "Career Growth", body: "Clear path from Junior Broker to Senior to Director." },
];

export default function CareersPage() {
  return (
    <div className="pt-[68px]">
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="border-b-[3px] border-foreground">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3">
            <span className="section-label text-muted-foreground">Careers at BRUT Realty</span>
          </div>
          <div className="px-5 md:px-10 py-12 md:py-20">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-sans font-extrabold leading-tight tracking-tight mb-5"
              style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
            >
              Work with the<br />
              <span className="stroke">best.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-sans text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
            >
              We're a small, high-performance team. We don't hire often — but when we do, we hire for keeps. If you're serious about real estate and serious about results, read on.
            </motion.p>
          </div>
        </section>

        {/* Open Roles */}
        <section className="border-b-[3px] border-foreground">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex items-center gap-4">
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">Open Roles</h2>
          </div>
          <div className="flex flex-col divide-y-[3px] divide-foreground/15">
            {ROLES.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-5 md:px-10 py-6 md:py-8 flex flex-col md:flex-row md:items-start justify-between gap-4 group hover:bg-muted transition-colors duration-200"
              >
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-sans font-bold text-lg md:text-xl">{role.title}</h3>
                    <span className="bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1">
                      {role.type}
                    </span>
                  </div>
                  <p className="section-label text-muted-foreground">{role.location}</p>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed max-w-xl mt-1">{role.summary}</p>
                </div>
                <a
                  href="mailto:careers@brutrealty.in?subject=Application — {role.title}"
                  className="btn-fill-dark bg-primary text-primary-foreground px-5 py-2.5 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block flex-shrink-0 self-start md:self-center"
                >
                  Apply →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Perks */}
        <section className="border-b-[3px] border-foreground">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4">
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">Why BRUT</h2>
          </div>
          <div className="px-5 md:px-10 py-8 md:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {PERKS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="border-[3px] border-foreground bg-card p-5 bs"
              >
                <h3 className="font-sans font-bold text-base mb-2">{p.title}</h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Speculative CTA */}
        <section className="px-5 md:px-10 py-10 md:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-foreground">
          <div>
            <h3 className="font-sans font-extrabold text-card text-xl md:text-2xl mb-2">Don't see your role?</h3>
            <p className="font-sans text-card/50 text-sm">We're always open to hearing from exceptional people.</p>
          </div>
          <a
            href="mailto:careers@brutrealty.in"
            className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3.5 font-bold border-2 border-primary-foreground/20 uppercase tracking-widest text-xs cursor-pointer inline-block"
          >
            Send Your CV →
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
