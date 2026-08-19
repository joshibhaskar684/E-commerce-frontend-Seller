export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Merchant Finances
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Commission & Payout Policy
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Fee Structures, Statutory Tax Withholdings (TDS/TCS), and Disbursement Timelines on Quick (quicksin.in)
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-zinc-800/60 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-6 mb-10 text-sm leading-relaxed">
        <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          FINANCIAL TRANSPARENCY COMMITMENT:
        </p>
        <p>
          Quick operates on a transparent fee schedule. All merchant earnings are calculated after deducting applicable marketplace commission, fixed closing charges, payment gateway fees, and statutory taxes governed by Indian financial and Goods & Services Tax laws.
        </p>
      </div>

      <section className="space-y-10">
        {/* Section 1 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">1</span>
            Marketplace Fee Structure Breakdown
          </h2>
          <p className="text-sm mb-4">
            For every successful order completed on Quick, the following fee components apply:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                A. Category Referral Commission
              </h3>
              <p className="text-xs leading-relaxed opacity-90">
                A percentage fee charged on the item price (excl. GST). Rates vary by category:
              </p>
              <ul className="list-disc pl-4 mt-2 text-xs space-y-1 opacity-90">
                <li>Electronics & Appliances: 3% – 8%</li>
                <li>Fashion & Apparel: 10% – 15%</li>
                <li>Home, Kitchen & Living: 8% – 12%</li>
                <li>Beauty & Personal Care: 6% – 10%</li>
                <li>Books & Stationery: 5% – 8%</li>
              </ul>
            </div>

            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                B. Fixed Closing Fee
              </h3>
              <p className="text-xs leading-relaxed opacity-90">
                A nominal fee charged per successfully delivered order item based on transaction slab:
              </p>
              <ul className="list-disc pl-4 mt-2 text-xs space-y-1 opacity-90">
                <li>Order value ₹0 – ₹250: ₹5</li>
                <li>Order value ₹251 – ₹500: ₹10</li>
                <li>Order value ₹501 – ₹1,000: ₹15</li>
                <li>Order value above ₹1,000: ₹25</li>
              </ul>
            </div>

            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                C. Payment Gateway Fee
              </h3>
              <p className="text-xs leading-relaxed opacity-90">
                A technology processing fee of <strong>2.0% + GST</strong> on the total customer checkout amount to cover payment gateway card/UPI/netbanking processing charges.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">2</span>
            Mandatory Statutory Tax Deductions (TDS & TCS)
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Under Indian tax regulations governing e-commerce marketplace platforms, Quick is legally mandated to perform the following statutory deductions:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>TDS under Income Tax Act (Section 194-O):</strong> Quick shall deduct <strong>1.0%</strong> as Income Tax TDS on the gross sales amount of goods sold. Form 16A TDS certificates will be issued quarterly to enable sellers to claim tax credit during income tax filing.
              </li>
              <li>
                <strong>TCS under GST (Section 52 of CGST Act):</strong> Quick shall collect <strong>1.0%</strong> (0.5% CGST + 0.5% SGST or 1.0% IGST) as Tax Collected at Source on net taxable supplies. TCS data is submitted monthly in Form GSTR-8 and auto-populates in the seller’s GST portal for Input Tax Credit (ITC) utilization.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">3</span>
            Seller Settlement Timeline & Payout Schedule
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Settlement disbursements are executed via direct National Electronic Funds Transfer (NEFT) or Real Time Gross Settlement (RTGS) to your verified bank account:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Settlement Window (T+7 Days):</strong> Earnings from completed orders are eligible for settlement <strong>7 business days</strong> post successful customer delivery, provided the customer return window has expired without return requests.
              </li>
              <li>
                <strong>Weekly Payout Frequency:</strong> Settlements are processed every <strong>Tuesday & Friday</strong>. Detailed payout statements specifying order-wise commission, tax deductions, and net amount credited are accessible in the Seller Portal under Payout Reports.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">4</span>
            Payout Deductions, Holds & Penalties
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Quick reserves the right to make necessary adjustments to current or future payout disbursements in the following scenarios:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Customer Returns & Refunds:</strong> Reversal of sale proceeds for returned or refunded items.</li>
              <li><strong>Stockout Penalties:</strong> A seller cancellation penalty fee of 5% of order value (max ₹500) for orders cancelled by the seller post-confirmation.</li>
              <li><strong>Reverse Logistics Fees:</strong> Reverse courier shipping charges deducted for defective or wrong item returns attributable to seller error.</li>
              <li><strong>Dispute Hold Reserve:</strong> Temporary withholding of funds during active fraud investigations, legal disputes, or pending document verification.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-12 p-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
        <p className="text-sm font-medium">
          Have queries regarding payout statements or tax certificates?
        </p>
        <p className="text-sm mt-1">
          Reach out to our Merchant Accounts Desk at{" "}
          <a href="mailto:support@quicksin.in" className="text-yellow-600 dark:text-yellow-400 font-semibold underline">
            support@quicksin.in
          </a>
        </p>
      </div>
    </main>
  );
}