export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Legal Liability & IP
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Marketplace Disclaimer & IP Policy
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Intermediary Exemption under Section 79 of IT Act, 2000 & Intellectual Property Takedown Mechanism
        </p>
      </div>

      <section className="space-y-8 text-foreground">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Intermediary Status & Exemption</h2>
          <p className="text-sm leading-relaxed opacity-90">
            <strong>Quick (quicksin.in)</strong> is an e-commerce marketplace platform providing technical infrastructure to connect independent merchants with buying customers. Under Section 79 of the Information Technology Act, 2000, Quick functions as an intermediary and is exempt from third-party product liability, seller representations, or merchant warranty breaches.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Product Warranty & Description Disclaimer</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Product listings, technical specifications, warranty duration, ingredient declarations, and promotional images are uploaded directly by independent registered sellers. Quick makes no warranties, express or implied, regarding product fitness, commercial merchantability, or listing accuracy. All purchases are executed directly between buyer and seller.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Intellectual Property (IP) Infringement & Takedown Policy</h2>
          <p className="text-sm leading-relaxed opacity-90 mb-2">
            Quick respects the intellectual property rights of brand owners, trademark holders, and copyright creators. If you believe a product listed on Quick infringes your registered trademark or copyright:
          </p>
          <div className="p-5 border border-border rounded-xl bg-card">
            <h3 className="font-bold text-sm text-yellow-600 dark:text-yellow-400 mb-2">
              Notice & Takedown Filing Procedure:
            </h3>
            <p className="text-xs opacity-90 mb-2">Submit a formal Infringement Notice to <code>support@quicksin.in</code> containing:</p>
            <ul className="list-disc pl-5 text-xs space-y-1 opacity-90">
              <li>Name and contact details of the Trademark / Copyright Owner or authorized agent.</li>
              <li>Proof of Registered Trademark / Copyright Certificate issued by the Indian IP Office.</li>
              <li>Specific Product URLs / Product Listing IDs hosted on Quick suspected of infringement.</li>
              <li>A declaration stating that the information provided in the notice is accurate under penalty of perjury.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Technical & Platform Disclaimers</h2>
          <p className="text-sm leading-relaxed opacity-90">
            While Quick strives to maintain 99.9% server uptime, we do not warrant uninterrupted, error-free portal operation. Quick shall not be liable for losses caused by server downtime, internet gateway outages, or cyber attacks beyond our reasonable control.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Contact Information</h2>
          <p className="text-sm leading-relaxed opacity-90">
            For IP infringement complaints or legal disclaimers queries, contact:
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