import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { team } from "@/data";
import { Phone, Mail, MapPin, Award, Briefcase } from "lucide-react";
import { useState } from "react";

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <Reveal key={member.id} direction="up" delay={index * 0.08}>
      <div className="border-[3px] border-foreground bg-card overflow-hidden flex flex-col bs group">
        {/* Photo — B&W with colour on hover */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {!imgLoaded && <div className="absolute inset-0 img-placeholder" />}
          <img
            src={member.image}
            alt={member.name}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-top transition-all duration-500 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            } grayscale group-hover:grayscale-0 group-hover:scale-105`}
          />
          {/* Experience badge */}
          <div className="absolute top-3 right-3 bg-foreground text-card font-mono text-[9px] font-bold px-2 py-1 uppercase tracking-[0.18em]">
            {member.experience}
          </div>
          {/* Specialty strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="section-label text-primary-foreground/70 mb-0.5">Specialisation</p>
            <p className="font-bold text-sm">{member.specialization}</p>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 p-5 border-t-[3px] border-foreground flex-1">
          <div>
            <p className="section-label text-muted-foreground mb-0.5">{member.title}</p>
            <h3 className="font-sans font-bold text-lg leading-tight">{member.name}</h3>
          </div>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

          {/* Details */}
          <div className="flex flex-col gap-2 border-t border-foreground/10 pt-3 mt-auto">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="font-sans text-muted-foreground">{member.neighborhood}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span className="font-sans text-muted-foreground">{member.deals} deals closed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span className="font-sans text-muted-foreground">{member.languages.join(", ")}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="flex-1 btn-fill-dark bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-3 py-2 border-2 border-foreground bs bs-hover cursor-pointer inline-flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3" /> Call
              </a>
              <a href={`mailto:${member.email}`} className="flex-1 btn-fill-primary bg-transparent text-foreground font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-3 py-2 border-2 border-foreground/40 cursor-pointer inline-flex items-center justify-center gap-1.5">
                <Mail className="w-3 h-3" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function TeamPage() {
  return (
    <div className="pt-[68px]">
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <PageHero
          eyebrow="The Squad"
          title="Meet the"
          highlight="whole team"
          subtitle="Four specialist brokers, each owning one micro-market. No territory overlap. No generalists."
          crumb="Team"
        />

        <section className="px-5 md:px-10 py-12 md:py-16">
          <RevealGroup stagger={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {team.map((member, i) => (
                <TeamCard key={member.id} member={member} index={i} />
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* Bottom strip */}
        <div className="border-t-[3px] border-foreground px-5 md:px-10 py-6 bg-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-card">
          <p className="font-mono text-[11px] text-card/50 uppercase tracking-[0.18em]">
            Every broker is hand-picked, RERA certified · MahaRERA compliant
          </p>
          <a
            href="/#contact"
            className="btn-fill-primary-on-dark bg-foreground text-card font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-5 py-2.5 border-2 border-card/20 bs-cream bs-cream-hover cursor-pointer inline-block"
          >
            Speak to a Broker →
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
