import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const LAST_UPDATED = "1 June 2025";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: `BRUT Realty Pvt. Ltd. ("BRUT", "we", "us", or "our") operates from Level 28, One World Center, S.B. Marg, Lower Parel West, Mumbai 400 013, Maharashtra, India. This Privacy Policy explains how we collect, use, disclose and protect your personal data when you use our website (brutrealty.in), engage with us by phone, email, or in person, or otherwise interact with our services.\n\nThis Policy is compliant with the Digital Personal Data Protection Act, 2023 (DPDPA) and any applicable rules made thereunder. By using our services, you acknowledge that you have read and understood this Policy.`,
  },
  {
    title: "2. Data We Collect",
    body: `We collect the following categories of personal data:\n\n• Identity Data: full name, title, gender.\n• Contact Data: email address, mobile number, postal address.\n• Property Preference Data: budget range, property type, desired neighbourhood, number of bedrooms.\n• Transaction Data: details about properties viewed, shortlisted, or purchased through us.\n• Communication Data: records of calls, WhatsApp messages, emails, and in-person meeting notes.\n• Technical Data: IP address, browser type, operating system, device identifiers, and cookies when you visit our website.\n• Usage Data: pages visited, time on site, referral sources.\n\nWe do not collect any sensitive personal data such as financial account numbers, Aadhaar numbers, biometric data, health information, or caste/religious data unless specifically required and with explicit written consent.`,
  },
  {
    title: "3. Legal Basis for Processing",
    body: `Under the DPDPA 2023, we process your personal data on the following lawful bases:\n\n• Consent: when you submit an enquiry form, subscribe to updates, or contact us voluntarily.\n• Contractual Necessity: when processing is necessary to perform our brokerage services on your behalf.\n• Legitimate Interests: for fraud prevention, improving our services, and direct marketing to existing clients (subject to your right to opt out).\n• Legal Obligation: when we are required to retain or disclose data under MahaRERA regulations, GST Act, Income Tax Act, or any court order.`,
  },
  {
    title: "4. How We Use Your Data",
    body: `We use your personal data to:\n\n• Respond to your property enquiries and match you with suitable listings.\n• Schedule and manage property viewings.\n• Facilitate negotiations and documentation on your behalf.\n• Send you relevant property updates (you may opt out at any time).\n• Comply with MahaRERA disclosure obligations.\n• Improve our website, services, and internal processes.\n• Conduct anti-money laundering (AML) checks as required under the Prevention of Money Laundering Act (PMLA).\n• Prepare and file required statutory disclosures.`,
  },
  {
    title: "5. Data Sharing & Disclosure",
    body: `We do not sell, rent, or trade your personal data. We may share data with:\n\n• Property Owners and Developers: to arrange viewings or execute transactions on your behalf.\n• Legal and Financial Advisors: solicitors, chartered accountants, or banks as required for a transaction.\n• Service Providers: IT providers, CRM platforms, and communication tools that process data on our behalf under written data processing agreements.\n• Regulatory Authorities: MahaRERA, Income Tax Department, Financial Intelligence Unit (FIU-IND), or courts when required by law.\n• Business Transfers: in the event of a merger, acquisition, or sale of business assets, with prior notice to you.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, or as required by law:\n\n• Enquiry-only contacts: 24 months from last interaction.\n• Clients (completed transactions): 7 years from completion (as required under the Income Tax Act and MahaRERA).\n• Marketing contacts: until you withdraw consent.\n\nAfter retention periods expire, data is securely deleted or anonymised.`,
  },
  {
    title: "7. Your Rights Under DPDPA 2023",
    body: `As a Data Principal under the DPDPA 2023, you have the right to:\n\n• Access: request a copy of the personal data we hold about you.\n• Correction: request correction of inaccurate or incomplete data.\n• Erasure: request deletion of your data where we no longer have a lawful basis to process it.\n• Grievance Redressal: lodge a complaint with our Data Protection Officer.\n• Nomination: nominate another individual to exercise these rights on your behalf in the event of death or incapacity.\n\nTo exercise any of these rights, contact our Data Protection Officer at privacy@brutrealty.in or by post at the address above. We will respond within 30 days.`,
  },
  {
    title: "8. Cookies",
    body: `Our website uses cookies and similar tracking technologies to enhance your experience. These include:\n\n• Essential Cookies: required for the website to function. Cannot be disabled.\n• Analytics Cookies: help us understand how visitors use our site (e.g., Google Analytics). You may opt out via your browser settings.\n• Marketing Cookies: used to show relevant property content across platforms. You may manage these via our cookie preferences.\n\nYou can control cookies through your browser settings. Note that disabling cookies may affect some website functionality.`,
  },
  {
    title: "9. Security",
    body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These include SSL/TLS encryption for data in transit, access controls, regular security audits, and staff training.\n\nIn the event of a personal data breach that poses a risk to your rights and freedoms, we will notify you and the relevant regulatory authority as required by the DPDPA 2023.`,
  },
  {
    title: "10. Grievance Officer",
    body: `In accordance with the DPDPA 2023 and IT Act 2000, we have appointed a Grievance Officer:\n\nName: Rohan Kapoor\nDesignation: VP of Operations & Data Protection Officer\nEmail: privacy@brutrealty.in\nAddress: Level 28, One World Center, S.B. Marg, Lower Parel West, Mumbai 400 013\nPhone: +91 22 4567 8900\n\nYou may lodge a grievance within 30 days of the occurrence. We will resolve it within 30 days of receipt.`,
  },
  {
    title: "11. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. The "Last Updated" date at the top reflects the most recent revision. Where changes are material, we will notify you by email or via a prominent notice on our website. Continued use of our services after the effective date constitutes your acceptance of the revised Policy.`,
  },
  {
    title: "12. Governing Law & Jurisdiction",
    body: `This Privacy Policy is governed by the laws of India. Any disputes arising in connection with this Policy shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-[68px]">
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="border-b-[3px] border-foreground">
          <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex items-center justify-between flex-wrap gap-2">
            <span className="section-label text-muted-foreground">Legal / Privacy Policy</span>
            <span className="section-label text-muted-foreground">Last Updated: {LAST_UPDATED}</span>
          </div>
          <div className="px-5 md:px-10 py-10 md:py-14">
            <h1 className="font-sans font-extrabold leading-tight tracking-tight mb-3" style={{ fontSize: "clamp(34px, 5vw, 64px)" }}>
              Privacy Policy
            </h1>
            <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
              BRUT Realty Pvt. Ltd. is committed to protecting your personal data. This Policy is compliant with the Digital Personal Data Protection Act, 2023 (DPDPA) and applicable Indian regulations.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-5 md:px-10 py-10 md:py-14 max-w-4xl">
          <div className="flex flex-col gap-10 md:gap-12">
            {SECTIONS.map((s) => (
              <div key={s.title} className="flex flex-col gap-3 border-b border-foreground/10 pb-10">
                <h2 className="font-sans font-bold text-lg md:text-xl">{s.title}</h2>
                {s.body.split("\n\n").map((para, i) => (
                  <p key={i} className="font-sans text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t-[3px] border-foreground px-5 md:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted">
          <div>
            <p className="font-sans font-bold text-base mb-0.5">Questions about your privacy?</p>
            <p className="font-sans text-muted-foreground text-sm">Contact our Data Protection Officer at privacy@brutrealty.in</p>
          </div>
          <a
            href="mailto:privacy@brutrealty.in"
            className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block"
          >
            Contact DPO →
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
