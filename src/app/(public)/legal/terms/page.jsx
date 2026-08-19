export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Terms of Service
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Marketplace Terms & Conditions
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Last updated: August 19, 2026 | Governing Quick Seller Portal (quicksin.in)
        </p>
      </div>

      <section className="space-y-8 text-foreground">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-sm leading-relaxed opacity-90">
            By accessing, creating a merchant account, listing inventory, or utilizing any services provided by <strong>Quick (quicksin.in)</strong> (“Platform”, “We”, “Us”), you agree to be bound by these Terms & Conditions. These terms constitute a legally binding agreement under the Information Technology Act, 2000 and rules promulgated thereunder.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Intermediary Role & Legal Status</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Quick operates as an e-commerce marketplace intermediary facilitating commercial transactions between independent third-party sellers and purchasing consumers. In accordance with Section 79 of the Information Technology Act, 2000 and Rule 5 of the Consumer Protection (E-Commerce) Rules, 2020, Quick does not own, manufacture, store, or sell listed products unless explicitly stated in writing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Seller Account Security & Operational Responsibilities</h2>
          <p className="text-sm leading-relaxed opacity-90 mb-2">
            Registered merchant account holders agree to:
          </p>
          <ul className="list-disc pl-6 text-sm space-y-1.5 opacity-90">
            <li>Maintain accurate, up-to-date business entity, GSTIN, PAN, and banking information.</li>
            <li>Safeguard account passwords and API credentials against unauthorized access.</li>
            <li>Bear complete responsibility for all operations, listings, price entries, and transactions conducted under their seller credentials.</li>
            <li>Notify Quick immediately at <code>support@quicksin.in</code> upon suspecting any security compromise.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Catalog Pricing, MRP & Tax Transparency</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Sellers guarantee that all product pricing displayed on Quick does not exceed the Maximum Retail Price (MRP) mandated by Legal Metrology rules. Displayed prices must be inclusive of all GST taxes and charges. Artificial price manipulation, deceptive discounts, or hidden charges are strictly illegal and prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Service Level Agreement (SLA) & Order Fulfillment</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Sellers are obligated to confirm and pack orders within <strong>24 to 48 hours</strong> of order placement. Failure to comply with processing timelines or persistent order cancellations due to inventory stockouts will result in financial penalties and merchant account rating degradation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Intellectual Property & Brand Rules</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Sellers warrant that product images, trademarks, brand names, and description texts uploaded to the seller portal do not infringe on any third-party copyrights or registered trademarks. Quick reserves the right to immediately delist any product flagged for trademark or copyright infringement.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. System Access & Security Restrictions</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Users shall not attempt to reverse engineer, scrape, introduce malware, conduct unauthorized vulnerability scans, or bypass security controls of the Quick Seller API or dashboard.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Account Suspension & Termination</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Quick reserves the right to suspend or terminate seller accounts that breach platform guidelines, list counterfeit items, engage in fraudulent transactions, or maintain unacceptable customer satisfaction ratings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Governing Law & Dispute Jurisdiction</h2>
          <p className="text-sm leading-relaxed opacity-90">
            These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any legal disputes or proceedings arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in India.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">10. Contact Information</h2>
          <p className="text-sm leading-relaxed opacity-90">
            For questions regarding these Terms & Conditions, please contact us at:
          </p>
          <ul className="mt-2 text-sm space-y-1">
            <li>Email: <a href="mailto:support@quicksin.in" className="underline font-medium">support@quicksin.in</a></li>
            <li>Website: <a href="https://quicksin.in" className="underline font-medium">https://quicksin.in</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}