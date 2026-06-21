import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";

const LAST_UPDATED = "1 June 2025";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing our website (brutrealty.in), submitting an enquiry, or engaging BRUT Realty Pvt. Ltd. ("BRUT", "we", "us") for any real estate services, you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy.\n\nIf you do not agree with any part of these Terms, please do not use our services. These Terms constitute a legally binding agreement under the Indian Contract Act, 1872.`,
  },
  {
    title: "2. About BRUT Realty",
    body: `BRUT Realty Pvt. Ltd. is a licensed real estate brokerage firm incorporated under the Companies Act, 2013, with its registered office at Level 28, One World Center, S.B. Marg, Lower Parel West, Mumbai 400 013, Maharashtra.\n\nWe are registered under the Maharashtra Real Estate Regulatory Authority (MahaRERA) with Registration No. P51800028099, in compliance with the Real Estate (Regulation and Development) Act, 2016 (RERA).`,
  },
  {
    title: "3. Our Services",
    body: `BRUT Realty provides the following services:\n\n• Residential rental facilitation (luxury, premium, and ultra-premium segments)\n• Residential property purchase advisory and facilitation\n• Off-market property sourcing and introductions\n• Real estate investment consulting\n• Commercial property brokerage\n\nAll services are subject to separate engagement agreements executed between BRUT and each client. These Terms govern general use of our website and communications; specific brokerage engagements are governed by signed mandates and engagement letters.`,
  },
  {
    title: "4. RERA Compliance",
    body: `BRUT Realty operates in full compliance with the Real Estate (Regulation and Development) Act, 2016 and the Maharashtra Real Estate Regulatory Authority (MahaRERA) Rules, 2017.\n\n• Our MahaRERA Agent Registration No. is P51800028099.\n• All properties we market are either RERA-registered projects or exempt under the Act.\n• We maintain project disclosures and documentation as required by MahaRERA.\n• Clients have the right to verify any information on the MahaRERA portal at maharera.mahaonline.gov.in.`,
  },
  {
    title: "5. Client Obligations",
    body: `By engaging our services, you agree to:\n\n• Provide accurate, complete, and truthful information during the enquiry and engagement process.\n• Conduct property viewings in good faith and not misuse access to private properties.\n• Maintain confidentiality of any off-market property information shared by BRUT.\n• Not circumvent BRUT by directly approaching property owners introduced through our services within 24 months of introduction.\n• Comply with all applicable laws, including the Prevention of Money Laundering Act, 2002 (PMLA) when completing real estate transactions.\n• Not use our services for any unlawful purpose.`,
  },
  {
    title: "6. Fees & Brokerage Commission",
    body: `BRUT's brokerage commission for facilitating property transactions is as follows (unless otherwise agreed in writing):\n\n• Rental Transactions: One month's rent plus applicable GST (18%), payable upon execution of the leave & license agreement.\n• Purchase Transactions: 1%–2% of the transaction value plus applicable GST (18%), as agreed in the engagement letter.\n• Consulting Retainers: As specified in the consulting agreement.\n\nAll fees are exclusive of stamp duty, registration charges, legal fees, and any other statutory costs, which are borne by the client. BRUT's commission becomes payable upon introduction of a suitable property that results in a transaction, regardless of whether BRUT continues to facilitate the closing.`,
  },
  {
    title: "7. Property Listings Disclaimer",
    body: `Property listings displayed on our website or shared via email/WhatsApp are for informational purposes only.\n\n• Availability, pricing, and property details are subject to change without notice.\n• BRUT does not warrant the accuracy or completeness of listing information provided by property owners or developers.\n• Images, floor plans, and virtual tours are indicative and may not reflect the exact current condition of the property.\n• BRUT is not liable for any inaccuracies in listing information provided to us in good faith by third parties.\n\nClients are advised to conduct independent due diligence, including physical inspection and verification of title documents, before entering into any property transaction.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `To the maximum extent permitted by applicable Indian law:\n\n• BRUT's aggregate liability to any client for any claim arising from our services shall not exceed the total brokerage fees actually paid by that client to BRUT in the preceding 12 months.\n• BRUT is not liable for any indirect, consequential, special, or punitive damages, including loss of profit, loss of data, or loss of business opportunity.\n• BRUT is not responsible for any disputes between landlords and tenants, sellers and buyers, or any third parties introduced through our services, after the transaction has been completed.\n• BRUT does not provide legal, financial, tax, or investment advice. Clients should engage independent qualified professionals before making any real estate decision.`,
  },
  {
    title: "9. Intellectual Property",
    body: `All content on brutrealty.in — including text, photography, brand assets, logos, design elements, and compiled property data — is the exclusive property of BRUT Realty Pvt. Ltd. or its licensors, protected under the Copyright Act, 1957 and the Trade Marks Act, 1999.\n\nYou may not reproduce, distribute, modify, or create derivative works of any BRUT content without express written permission. Property photographs remain the copyright of the original photographers and may not be used without licence.`,
  },
  {
    title: "10. Website Use",
    body: `You agree not to:\n\n• Scrape, crawl, or systematically extract data from brutrealty.in without written permission.\n• Use any automated means to access or interact with our website.\n• Introduce viruses, malware, or other harmful code.\n• Attempt to gain unauthorised access to any part of our systems.\n• Use our contact forms or email addresses to send unsolicited communications.\n\nWe reserve the right to block access or take legal action against any person or entity engaged in prohibited use.`,
  },
  {
    title: "11. Third-Party Links",
    body: `Our website may contain links to third-party websites including property portals, MahaRERA, government websites, and partner services. These links are provided for convenience only. BRUT does not endorse, control, or accept responsibility for the content, privacy practices, or terms of any third-party website. Your use of third-party sites is at your own risk.`,
  },
  {
    title: "12. Modifications to Terms",
    body: `BRUT reserves the right to update or modify these Terms at any time. The "Last Updated" date at the top of this page reflects the most recent revision. Where changes are material, we will notify active clients by email. Continued use of our services after the effective date of any changes constitutes your acceptance of the revised Terms.`,
  },
  {
    title: "13. Termination",
    body: `Either party may terminate an engagement or cease using BRUT's services at any time, subject to any obligations accrued prior to termination (including payment of commission for introductions already made). BRUT reserves the right to refuse service to any person without cause.`,
  },
  {
    title: "14. Governing Law & Dispute Resolution",
    body: `These Terms are governed by the laws of the Republic of India. Any dispute, controversy, or claim arising out of or in connection with these Terms shall be:\n\n(a) First attempted to be resolved amicably through written negotiation within 30 days of a dispute notice; and\n(b) If unresolved, submitted to binding arbitration under the Arbitration and Conciliation Act, 1996, with a sole arbitrator appointed by mutual agreement, seated in Mumbai, conducted in English.\n\nSubject to (b), the courts of Mumbai, Maharashtra shall have exclusive jurisdiction.`,
  },
  {
    title: "15. Contact Us",
    body: `For questions or concerns about these Terms, please contact:\n\nBRUT Realty Pvt. Ltd.\nLevel 28, One World Center\nS.B. Marg, Lower Parel West\nMumbai 400 013, Maharashtra\n\nEmail: legal@brutrealty.in\nPhone: +91 22 4567 8900`,
  },
];

export default function TermsPage() {
  return (
    <div className="pt-[68px]">
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <PageHero
          eyebrow="Legal / Terms of Service"
          title="Terms of"
          highlight="Service"
          subtitle="These Terms govern your use of BRUT Realty's website and services, compliant with the Indian Contract Act and RERA."
          crumb="Terms of Service"
        />

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-12 md:py-16 max-w-4xl">
          <RevealGroup stagger={0.08}>
            <div className="flex flex-col gap-10 md:gap-12">
              {SECTIONS.map((s) => (
                <Reveal key={s.title} direction="up">
                  <div className="flex flex-col gap-3 border-b border-foreground/10 pb-10 last:border-b-0">
                    <h2 className="font-sans font-extrabold text-xl md:text-2xl tracking-tight">{s.title}</h2>
                    {s.body.split("\n\n").map((para, i) => (
                      <p key={i} className="font-sans text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </section>

        <section className="border-t-[3px] border-foreground px-5 md:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted">
          <div>
            <p className="font-sans font-bold text-base mb-0.5">Legal queries?</p>
            <p className="font-sans text-muted-foreground text-sm">Contact our legal team at legal@brutrealty.in</p>
          </div>
          <a
            href="mailto:legal@brutrealty.in"
            className="btn-fill-dark bg-primary text-primary-foreground px-6 py-3 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-xs cursor-pointer inline-block"
          >
            Contact Legal →
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
