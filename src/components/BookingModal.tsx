import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar, Clock, User, MapPin } from "lucide-react";
import { team } from "@/data";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedBrokerId?: number;
  propertyContext?: string;
}

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function BookingModal({ open, onClose, preselectedBrokerId, propertyContext }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    brokerId: preselectedBrokerId || 1,
    date: "",
    time: "",
    message: propertyContext || "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedBroker = team.find((b) => b.id === form.brokerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const message = `Hi BRUT! I'd like to book a call with ${selectedBroker?.name} on ${form.date} at ${form.time}. ${form.message}`;
    window.open(`https://wa.me/${selectedBroker?.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      onClose();
    }, 2000);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", brokerId: preselectedBrokerId || 1, date: "", time: "", message: propertyContext || "" });
    setStep(1);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 flex items-end md:items-center justify-center"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card w-full max-w-lg border-t-[3px] md:border-[3px] border-foreground bs-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-foreground bg-primary text-primary-foreground">
                <div>
                  <p className="section-label text-primary-foreground/70">Book a Call</p>
                  <h3 className="font-sans font-bold text-lg">Schedule a Viewing</h3>
                </div>
                <button onClick={() => { onClose(); resetForm(); }} className="cursor-pointer p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-sans font-bold text-lg mb-1">Redirecting to WhatsApp</p>
                  <p className="font-sans text-sm text-muted-foreground">
                    We'll connect you with {selectedBroker?.name} right away.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                  {/* Step 1: Personal details */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <p className="section-label text-muted-foreground">Your Details</p>
                      <div>
                        <label className="section-label text-muted-foreground/70 mb-1.5 block">Full Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          className="w-full border-2 border-foreground/30 bg-card px-3 py-2.5 font-sans text-sm outline-none focus:border-primary transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="section-label text-muted-foreground/70 mb-1.5 block">Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full border-2 border-foreground/30 bg-card px-3 py-2.5 font-sans text-sm outline-none focus:border-primary transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="section-label text-muted-foreground/70 mb-1.5 block">Phone</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full border-2 border-foreground/30 bg-card px-3 py-2.5 font-sans text-sm outline-none focus:border-primary transition-colors"
                          placeholder="+91 98... (WhatsApp)"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="btn-fill-dark bg-primary text-primary-foreground w-full px-6 py-3 font-bold border-2 border-foreground uppercase tracking-widest text-xs cursor-pointer inline-flex items-center justify-center gap-2"
                      >
                        Next <Calendar className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Broker + schedule */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="section-label text-primary hover:text-primary/80 transition-colors mb-2 cursor-pointer"
                      >
                        ← Back
                      </button>

                      <p className="section-label text-muted-foreground">Choose Your Broker</p>
                      <div className="grid grid-cols-2 gap-2">
                        {team.map((broker) => (
                          <button
                            key={broker.id}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, brokerId: broker.id }))}
                            className={`text-left p-3 border-2 transition-all cursor-pointer ${
                              form.brokerId === broker.id
                                ? "border-primary bg-primary/5"
                                : "border-foreground/20 hover:border-foreground/40"
                            }`}
                          >
                            <p className="font-sans font-bold text-sm">{broker.name}</p>
                            <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">{broker.neighborhood}</p>
                          </button>
                        ))}
                      </div>

                      <p className="section-label text-muted-foreground">Preferred Date</p>
                      <div className="flex items-center gap-2 border-2 border-foreground/30 px-3 py-2.5">
                        <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <input
                          type="date"
                          required
                          value={form.date}
                          onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                          className="flex-1 bg-transparent border-none outline-none font-sans text-sm"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <p className="section-label text-muted-foreground">Preferred Time</p>
                      <div className="flex items-center gap-2 border-2 border-foreground/30 px-3 py-2.5">
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <select
                          required
                          value={form.time}
                          onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                          className="flex-1 bg-transparent border-none outline-none font-sans text-sm"
                        >
                          <option value="">Select time</option>
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="section-label text-muted-foreground/70 mb-1.5 block">Message (optional)</label>
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          className="w-full border-2 border-foreground/30 bg-card px-3 py-2.5 font-sans text-sm outline-none focus:border-primary transition-colors resize-none"
                          rows={2}
                          placeholder="Any specific requirements?"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-fill-dark bg-primary text-primary-foreground w-full px-6 py-3 font-bold border-2 border-foreground uppercase tracking-widest text-xs cursor-pointer inline-flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" /> Book via WhatsApp
                      </button>
                    </motion.div>
                  )}
                </form>
              )}

              {/* Broker info bar */}
              {selectedBroker && !submitted && (
                <div className="border-t-[3px] border-foreground/15 px-6 py-3 bg-muted/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-foreground/20 flex-shrink-0">
                    <img src={selectedBroker.image} alt={selectedBroker.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-bold text-sm truncate">{selectedBroker.name}</p>
                    <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> {selectedBroker.neighborhood}
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-card/50 uppercase tracking-wider">{selectedBroker.experience}</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}