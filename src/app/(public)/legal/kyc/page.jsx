export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Compliance & Verification
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Seller KYC & Verification Policy
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Mandatory Verification Guidelines for Onboarding Merchants on Quick (quicksin.in)
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-zinc-800/60 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-6 mb-10 text-sm leading-relaxed">
        <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          WHY IS KYC MANDATORY?
        </p>
        <p>
          In accordance with the Prevention of Money Laundering Act (PMLA), Goods and Services Tax (GST) regulations, and the Consumer Protection (E-Commerce) Rules, 2020, all sellers must complete mandatory Know Your Customer (KYC) identity and business verification prior to product listing and payout disbursement.
        </p>
      </div>

      <section className="space-y-10">
        {/* Section 1 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">1</span>
            Required Document Matrix by Business Type
          </h2>
          <p className="text-sm mb-4">
            Depending on your registered constitution type, you are required to submit legible, original scanned copies of the following documents:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Box 1 */}
            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                A. Sole Proprietorship / Individual Sellers
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                <li>Proprietor’s PAN Card (Mandatory)</li>
                <li>Aadhaar Card / Passport / Voter ID (Identity & Address Proof)</li>
                <li>GSTIN Registration Certificate (Form REG-06)</li>
                <li>Cancelled Cheque or Bank Statement displaying Account Holder Name, Account Number & IFSC</li>
                <li>Shop & Establishment Certificate or MSME Udyam Registration (If GST exempt)</li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                B. Partnership Firm / LLP
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                <li>Firm / LLP PAN Card (Mandatory)</li>
                <li>Partnership Deed or LLP Agreement</li>
                <li>LLP Certificate of Incorporation issued by MCA</li>
                <li>Authorized Partner’s PAN Card & Aadhaar Card</li>
                <li>GSTIN Registration Certificate in Firm Name</li>
                <li>Current Bank Account Cancelled Cheque in Firm Name</li>
              </ul>
            </div>

            {/* Box 3 */}
            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                C. Private Limited / Public Limited Company
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                <li>Company PAN Card (Mandatory)</li>
                <li>Certificate of Incorporation (CoI), MOA & AOA</li>
                <li>Board Resolution appointing Authorized Representative</li>
                <li>Authorized Signatory’s PAN Card & Aadhaar Card</li>
                <li>GSTIN Registration Certificate (Form REG-06)</li>
                <li>Company Bank Account Cancelled Cheque / Statement</li>
              </ul>
            </div>

            {/* Box 4 */}
            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-yellow-600 dark:text-yellow-400 mb-2">
                D. Category-Specific Regulatory Licenses
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                <li><strong>Food & Beverages:</strong> Active FSSAI License Number & Certificate</li>
                <li><strong>Drugs & Pharmaceuticals:</strong> Valid Wholesale / Retail Drug License</li>
                <li><strong>Cosmetics & Skincare:</strong> CDSCO / Form 20/21 compliance</li>
                <li><strong>Imported Goods:</strong> Import Export Code (IEC) Registration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">2</span>
            Verification Process & Review SLA
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Our Compliance Verification Team processes submitted seller documentations adhering to strict SLAs:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Turnaround Time (SLA):</strong> Document review is completed within <strong>24 to 48 business hours</strong> from submission.
              </li>
              <li>
                <strong>Automated GSTIN Validation:</strong> GSTIN details are cross-verified with the Government GST portal to ensure active filing status.
              </li>
              <li>
                <strong>Bank Account Penny-Drop Test:</strong> A micro-transaction penny drop test is conducted to verify account holder name matching between bank record and registered business name.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">3</span>
            Document Rejection Criteria & Resubmission Workflow
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Applications may be flagged or rejected under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mismatched Name: Discrepancy between PAN card name, GSTIN business name, and bank account holder name.</li>
              <li>Illegible Uploads: Blurry images, cut corners, missing pages, or unreadable text.</li>
              <li>Inactive GST Status: GSTIN found cancelled, suspended, or inactive on government tax portals.</li>
              <li>Expired Documents: Expired FSSAI licenses or outdated bank statements older than 3 months.</li>
            </ul>
            <p className="mt-2 text-xs opacity-80">
              In case of rejection, sellers will receive an email notification detailing specific reasons and may re-upload corrected documents via the Seller Portal settings tab.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">4</span>
            Ongoing Compliance & Annual Re-Verification
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Quick reserves the right to request updated KYC documents periodically:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Annual re-verification for high-volume seller tiers.</li>
              <li>Mandatory immediate re-upload upon modification of bank account details or business registration address.</li>
              <li>Failure to furnish updated documents within 14 days of notice will result in payout temporary hold.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-12 p-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
        <p className="text-sm font-medium">
          Need assistance with KYC upload or facing document rejection issues?
        </p>
        <p className="text-sm mt-1">
          Contact our Compliance Desk at{" "}
          <a href="mailto:support@quicksin.in" className="text-yellow-600 dark:text-yellow-400 font-semibold underline">
            support@quicksin.in
          </a>
        </p>
      </div>
    </main>
  );
}