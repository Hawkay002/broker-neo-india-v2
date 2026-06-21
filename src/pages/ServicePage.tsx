import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { services, type Service } from "@/data";
import { useParams, Link } from "wouter";
import { Check, ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import NotFound from "@/pages/not-found";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service: Service | undefined = services.find((s) => s.slug === slug);
  if (!service) {
    return <NotFound />;
  }

  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <div className="pt-[68px]">
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <PageHero
          eyebrow="Services"
          title={service.name}
          highlight={service.tagline}
          subtitle={service.short}
          crumb="Services"
        />

        {/* Description */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16 max-w-4xl">
          <RevealGroup stagger={0.08}>
            <div className="flex flex-col gap-4">
              {service.description.map((p, i) => (
                <Reveal key={i} direction="up">
                  <p className="font-sans text-muted-foreground leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* Deliverables */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16 bg-card">
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight mb-8">What's Included</h2>
          <RevealGroup stagger={0.06}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              {service.deliverables.map((d) => (
                <Reveal key={d} direction="up">
                  <div className="flex items-start gap-3 border-2 border-foreground/15 bg-background p-4">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-sans font-medium text-sm">{d}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* Process */}
        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16">
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight mb-8">The Process</h2>
          <RevealGroup stagger={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.process.map((step) => (
                <Reveal key={step.step} direction="up">
                  <div className="border-[3px] border-foreground bg-card p-5 bs flex flex-col gap-3 h-full">
                    <span className="font-mono font-bold text-3xl text-primary">{step.step}</span>
                    <h3 className="font-sans font-bold text-base">{step.title}</h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-auto">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* Image + pricing */}
        <section className="border-b-[3px] border-foreground">
          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            <img src={service.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/50" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-5">
              <div>
                <p className="section-label text-primary mb-2">Starting from</p>
                <p className="font-sans font-extrabold text-4xl md:text-5xl text-card">{service.startingPrice}</p>
                <p className="font-sans text-card/60 text-sm mt-2">No hidden fees. No surprises.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-card px-5 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight mb-2">Ready to start?</h2>
            <p className="font-sans text-card/60 max-w-md">Book a free consultation with a specialist broker.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+912245678900" className="btn-fill-primary-on-dark bg-foreground text-card px-6 py-3.5 font-bold border-2 border-card/30 bs-cream bs-cream-hover uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a href="/#contact" className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3.5 font-bold border-2 border-primary-foreground/20 uppercase tracking-widest text-xs cursor-pointer inline-flex items-center gap-2">
              Book a Call <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Other services */}
        <section className="px-5 md:px-10 py-12">
          <h2 className="font-sans font-extrabold text-2xl tracking-tight mb-6">Other Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="group border-[3px] border-foreground bg-card p-5 bs hover:border-primary transition-colors flex items-start gap-4">
                <span className="font-mono font-bold text-2xl text-primary">{s.name[0]}</span>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-base group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="font-sans text-sm text-muted-foreground mt-1">{s.short}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
