import { motion } from "framer-motion";
import { useState } from "react";
import OfficeMap from "@/components/OfficeMap";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "Rental", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="bg-background border-b-[3px] border-foreground">
      {/* Header */}
      <div className="border-b-[3px] border-foreground px-5 md:px-10 py-4 flex items-center gap-4">
        <span className="section-label text-muted-foreground">07 /</span>
        <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight">Get in Touch</h2>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left — Info & Map */}
        <div className="lg:w-[45%] border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-foreground flex flex-col">
          {/* Big headline */}
          <div className="px-5 md:px-10 py-8 md:py-12 flex-1">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-sans font-extrabold leading-tight tracking-tight mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
            >
              Let's find your<br />
              <span className="stroke">perfect</span><br />
              property.
            </motion.h3>
            <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm mb-8">
              Whether you're renting, buying, or exploring off-market options — we respond within the hour.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {[
                { label: "Address", value: "Level 28, One World Center\nS.B. Marg, Lower Parel West\nMumbai 400 013" },
                { label: "Phone", value: "+91 22 4567 8900" },
                { label: "Email", value: "hello@brutrealty.in" },
                { label: "Hours", value: "Mon–Sat · 9:00 am – 8:00 pm IST" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 items-start border-b border-foreground/10 pb-4">
                  <span className="section-label text-muted-foreground flex-shrink-0 w-16">{label}</span>
                  <span className="font-sans font-medium text-sm whitespace-pre-line leading-relaxed">{value}</span>
                </div>
              ))}
            </div>

            {/* RERA badge */}
            <div className="mt-6 inline-flex items-center gap-2 border-2 border-foreground px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="section-label">MahaRERA Reg. No. P51800028099</span>
            </div>
          </div>

          {/* Map */}
          <OfficeMap />
        </div>

        {/* Right — Form */}
        <div className="lg:flex-1 px-5 md:px-10 py-8 md:py-12 relative">
          {/* Corner decorations */}
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-foreground/20 hidden md:block pointer-events-none" />
          <div className="absolute bottom-4 left-4 md:left-10 w-5 h-5 border-b-2 border-l-2 border-foreground/20 hidden md:block pointer-events-none" />

          <h3 className="font-sans font-bold text-xl mb-6">Send a Message</h3>

          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="section-label text-muted-foreground block mb-1.5">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Vikram Sharma"
                className="w-full border-2 border-foreground/30 focus:border-primary bg-transparent px-4 py-3 font-sans text-sm outline-none transition-colors duration-200"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="section-label text-muted-foreground block mb-1.5">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="vikram@company.in"
                  className="w-full border-2 border-foreground/30 focus:border-primary bg-transparent px-4 py-3 font-sans text-sm outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="section-label text-muted-foreground block mb-1.5">Mobile</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full border-2 border-foreground/30 focus:border-primary bg-transparent px-4 py-3 font-sans text-sm outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="section-label text-muted-foreground block mb-1.5">I'm looking to</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border-2 border-foreground/30 focus:border-primary bg-card px-4 py-3 font-sans text-sm outline-none transition-colors duration-200 cursor-pointer"
              >
                <option>Rent a Property</option>
                <option>Purchase a Property</option>
                <option>Off-Market Opportunities</option>
                <option>Investment Consulting</option>
                <option>Commercial Space</option>
              </select>
            </div>

            {/* Budget range */}
            <div>
              <label className="section-label text-muted-foreground block mb-1.5">Budget Range (Monthly)</label>
              <select
                name="budget"
                className="w-full border-2 border-foreground/30 focus:border-primary bg-card px-4 py-3 font-sans text-sm outline-none transition-colors duration-200 cursor-pointer"
              >
                <option>Below ₹1,00,000</option>
                <option>₹1,00,000 – ₹3,00,000</option>
                <option>₹3,00,000 – ₹6,00,000</option>
                <option>₹6,00,000 – ₹12,00,000</option>
                <option>Above ₹12,00,000</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="section-label text-muted-foreground block mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us what you're looking for — neighbourhood preferences, must-haves, timeline..."
                className="w-full border-2 border-foreground/30 focus:border-primary bg-transparent px-4 py-3 font-sans text-sm outline-none resize-none transition-colors duration-200"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className={`btn-fill-dark bg-primary text-primary-foreground w-full py-4 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-sm cursor-pointer transition-all duration-200 ${
                sent ? "!bg-green-700 !border-green-800" : ""
              }`}
            >
              {sent ? "✓ Message Received — We'll Call You Shortly" : "Send Message →"}
            </button>

            <p className="font-mono text-[10px] text-muted-foreground text-center leading-relaxed">
              By submitting you agree to our{" "}
              <a href="/privacy" className="underline hover:text-primary transition-colors">Privacy Policy</a>
              {" "}and{" "}
              <a href="/terms" className="underline hover:text-primary transition-colors">Terms of Service</a>.
              Your data is protected under DPDPA 2023.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
