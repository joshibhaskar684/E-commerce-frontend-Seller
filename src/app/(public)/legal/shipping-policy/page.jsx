export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Logistics & Fulfillment
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Seller Shipping & Logistics Policy
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Order Dispatch SLAs, Packaging Norms, Courier Integration & RTO Guidelines on Quick (quicksin.in)
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-zinc-800/60 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-6 mb-10 text-sm leading-relaxed">
        <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          FULFILLMENT SLA MANDATE:
        </p>
        <p>
          Fast and reliable delivery is critical to customer satisfaction. Sellers operating on Quick must adhere to processing SLAs, secure packaging guidelines, and transparent shipment tracking procedures outlined in this policy.
        </p>
      </div>

      <section className="space-y-10">
        {/* Section 1 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">1</span>
            Order Processing & Dispatch SLA
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              When a customer places an order on Quick, the seller is assigned an order confirmation notice:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Dispatch SLA (24–48 Hours):</strong> Orders confirmed before 2:00 PM IST should ideally be dispatched on the same business day, and no later than <strong>48 hours</strong> from confirmation.
              </li>
              <li>
                <strong>Ready for Pickup Marking:</strong> Sellers using Quick Integrated Logistics must mark orders as "Ready for Pickup" in the seller portal once packaged.
              </li>
              <li>
                <strong>Cancellation Penalty for Delay:</strong> Failure to dispatch within 48 hours without customer consent may result in automatic order cancellation and a dispatch breach penalty charged to the seller account.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">2</span>
            Fulfillment Models: Platform Logistics vs Self-Ship
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                A. Quick Express Integrated Logistics
              </h3>
              <p className="text-xs leading-relaxed opacity-90">
                Quick partners with leading courier networks (Bluedart, Delhivery, Shadowfax, Xpressbees) to provide doorstep pickup from seller warehouses:
              </p>
              <ul className="list-disc pl-4 mt-2 text-xs space-y-1 opacity-90">
                <li>Automated shipping label and manifest generation.</li>
                <li>Real-time automated tracking sync to customer app.</li>
                <li>Standardized shipping rates calculated by volumetric weight.</li>
              </ul>
            </div>

            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                B. Merchant Self-Shipment
              </h3>
              <p className="text-xs leading-relaxed opacity-90">
                Approved sellers managing independent logistics must fulfill strict tracking requirements:
              </p>
              <ul className="list-disc pl-4 mt-2 text-xs space-y-1 opacity-90">
                <li>Must ship exclusively via reputed courier services providing active AWB tracking links.</li>
                <li>Must upload valid Tracking ID and Courier Name within 12 hours of dispatch.</li>
                <li>Seller assumes full liability for non-delivery or transit loss during self-ship.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">3</span>
            Packaging & Weight Discrepancy Rules
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Proper packaging protects products and prevents shipping fee disputes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Packaging Quality:</strong> All products must be enclosed in tamper-evident polybags or corrugated boxes with bubble wrap for fragile goods.
              </li>
              <li>
                <strong>Shipping Label Placement:</strong> The generated AWB shipping label displaying barcode, destination pincode, and order ID must be flatly affixed on the top surface.
              </li>
              <li>
                <strong>Weight Audits & Discrepancies:</strong> Shipping charges are calculated based on higher of Dead Weight or Volumetric Weight (L x W x H in cm / 5000). Courier weight discrepancies will be billed to the seller unless appealed with packaging dimensions proof within 5 days.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">4</span>
            Undelivered Orders & Return To Origin (RTO)
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Handling undelivered packages returned by courier:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>RTO Triggers:</strong> Shipments returned due to incorrect customer address, customer unreachability (3 failed attempts), or doorstep refusal are categorized as RTO.
              </li>
              <li>
                <strong>RTO Freight Billing:</strong> For customer-initiated RTO, backward shipping charges are borne as per the platform logistics agreement.
              </li>
              <li>
                <strong>RTO Inspection SLA:</strong> Returned RTO packages delivered back to the seller warehouse must be inspected within 48 hours. Sellers must report tampered RTO packages immediately to Merchant Support.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-12 p-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
        <p className="text-sm font-medium">
          Need help setting up warehouse pickup locations or shipping rate cards?
        </p>
        <p className="text-sm mt-1">
          Contact Logistics Support at{" "}
          <a href="mailto:support@quicksin.in" className="text-yellow-600 dark:text-yellow-400 font-semibold underline">
            support@quicksin.in
          </a>
        </p>
      </div>
    </main>
  );
}