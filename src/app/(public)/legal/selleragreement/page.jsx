export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Vendor Agreement
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Master Seller Agreement
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Effective Date: August 19, 2026 | Platform: Quick (quicksin.in)
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-zinc-800/60 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-6 mb-10 text-sm leading-relaxed">
        <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          IMPORTANT NOTICE TO ALL SELLERS:
        </p>
        <p>
          This Master Seller Agreement (“Agreement”) is a legally binding contract between{" "}
          <strong>Quick Marketplace Private Limited / Quick (quicksin.in)</strong> (“Quick”, “Platform”, “We”, “Us”) and the seller entity or individual registering to list and sell goods (“Seller”, “You”, “Vendor”). By registering as a seller, completing KYC verification, listing products, or accessing the Seller Dashboard, you unconditionally agree to all terms and conditions set forth herein.
        </p>
      </div>

      <section className="space-y-10 text-foreground">
        {/* Section 1 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">1</span>
            Seller Eligibility & Account Registration
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-opacity-90">
            <p>
              To register and operate as a seller on Quick, you must satisfy the following statutory requirements:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Legal Capacity:</strong> You must be an individual at least 18 years of age or a legal business entity (Sole Proprietorship, Partnership, LLP, Private Limited Company) duly incorporated under Indian laws.
              </li>
              <li>
                <strong>Statutory Registration:</strong> Possess an active Goods and Services Tax Identification Number (GSTIN) unless explicitly exempt under Central/State GST regulations, a valid Permanent Account Number (PAN), and an active Indian bank account in the registered business name.
              </li>
              <li>
                <strong>Accurate Credentials:</strong> Provide truthful, accurate, and current information during registration. Any false declaration will result in immediate termination of the seller account and potential forfeiture of pending settlements.
              </li>
              <li>
                <strong>Account Confidentiality:</strong> You are strictly responsible for preserving the confidentiality of your seller portal credentials and for all actions undertaken under your account login.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">2</span>
            Product Listing, Pricing & Authenticity Guarantee
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              As a merchant on our platform, you warrant and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Authenticity Guarantee:</strong> All products listed must be 100% genuine, original, brand-new, and non-counterfeit. Selling fake, replica, refurbished (unless classified as such), or stolen items is strictly prohibited.
              </li>
              <li>
                <strong>Listing Accuracy:</strong> Product listings, images, title descriptions, high-level specifications, warranty details, and country of origin must be accurate, truthful, and non-misleading in compliance with the Consumer Protection (E-Commerce) Rules, 2020.
              </li>
              <li>
                <strong>Pricing & Tax Inclusivity:</strong> Listed prices must not exceed the Maximum Retail Price (MRP) printed on the product packaging. All listed prices shall be inclusive of all applicable central, state, and local taxes (GST).
              </li>
              <li>
                <strong>Stock Availability:</strong> You must update product inventory levels in real-time. Systematically accepting orders for out-of-stock inventory will lead to seller penalties and rating downgrades.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">3</span>
            Order Fulfillment & Service Level Agreements (SLAs)
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Maintaining high customer satisfaction requires strict compliance with fulfillment timelines:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Dispatch SLA:</strong> Orders must be confirmed, packed, and handed over to designated courier logistics partners within <strong>24 to 48 hours</strong> of order confirmation.
              </li>
              <li>
                <strong>Packaging Standards:</strong> Products must be securely packaged in sturdy, tamper-evident packaging materials to prevent transit damage. Tax invoices and shipping labels generated via the Seller Portal must be affixed securely.
              </li>
              <li>
                <strong>Cancellation Penalties:</strong> Unilateral seller-initiated order cancellations due to stock shortage or pricing errors will attract a cancellation penalty as specified in our Commission & Fee Policy.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">4</span>
            Commissions, Payouts & Statutory Tax Compliance
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Financial transactions between Quick and the Seller shall be managed as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Platform Fees:</strong> Quick shall deduct referral commissions, fixed closing fees, payment gateway processing fees, and logistics fees from the order collection value prior to disbursement.
              </li>
              <li>
                <strong>Payout Cycle:</strong> Net seller settlements will be remitted to the seller’s verified bank account on a weekly settlement cycle (T+7 business days following delivery and expiry of the return window).
              </li>
              <li>
                <strong>TDS under Income Tax (Sec 194-O):</strong> Quick shall withhold Tax Deducted at Source (TDS) at the statutory rate (1%) on gross sale proceeds and deposit it with the Income Tax Department against the seller’s PAN.
              </li>
              <li>
                <strong>TCS under GST (Sec 52):</strong> Quick shall collect Tax Collected at Source (TCS) under GST (1%) on net taxable online supplies and file monthly returns (Form GSTR-8) to enable seller ITC claim.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 5 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">5</span>
            Customer Returns, Refunds & Seller Reimbursements
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Handling returns and protecting sellers against unfair buyer claims:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Return Acceptance:</strong> Sellers agree to accept returns for items reported as damaged, defective, wrong product, or failing description within the 7-day buyer return window.
              </li>
              <li>
                <strong>Reverse Logistics Charges:</strong> In cases of seller-fault returns (defective/wrong item), two-way shipping charges shall be borne by the seller.
              </li>
              <li>
                <strong>Seller SAFE Fund / Protection Claims:</strong> If a returned product is received damaged, used, or missing parts due to customer tampering or courier mishandling, sellers may file a SAFE claim within 72 hours of return delivery with unboxing video/photo proof for up to 100% product value reimbursement.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 6 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">6</span>
            Intellectual Property Rights & Marketing License
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Ownership and authorization rights regarding listings:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Seller IP Ownership:</strong> Sellers retain all intellectual property rights to their registered logos, trademarks, and brand materials uploaded to the platform.
              </li>
              <li>
                <strong>License to Quick:</strong> Sellers grant Quick a worldwide, royalty-free, non-exclusive license to display, promote, advertise, and index product listings across marketing channels.
              </li>
              <li>
                <strong>Non-Infringement:</strong> Sellers guarantee that listing content, images, and brand titles do not violate third-party trademarks, copyrights, or patents.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 7 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">7</span>
            Indemnification & Limitation of Liability
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              To the fullest extent permitted by applicable law:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Seller Indemnity:</strong> You agree to defend, indemnify, and hold harmless Quick, its directors, officers, employees, and affiliates from any claims, consumer court disputes, penalties, liabilities, or expenses arising from defective products, tax non-compliance, or IP infringement.
              </li>
              <li>
                <strong>Limitation of Liability:</strong> Quick acts as an e-commerce marketplace intermediary under Section 79 of the IT Act, 2000. Quick shall not be liable for indirect, incidental, or consequential damages.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 8 */}
        <div>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">8</span>
            Account Suspension, Termination & Governing Law
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Termination procedures and legal jurisdiction:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Termination by Cause:</strong> Quick reserves the right to immediately suspend or deactivate any seller account involved in fraudulent sales, listing prohibited items, persistent dispatch delays, or breach of this agreement.
              </li>
              <li>
                <strong>Offboarding Payout Hold:</strong> Upon termination, pending payouts may be held for up to 30 days to settle potential customer return requests or chargebacks.
              </li>
              <li>
                <strong>Governing Law & Jurisdiction:</strong> This Agreement shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in India.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-12 p-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
        <p className="text-sm font-medium">
          Have questions regarding vendor terms or partner agreements?
        </p>
        <p className="text-sm mt-1">
          Contact our Merchant Support Team at{" "}
          <a href="mailto:support@quicksin.in" className="text-yellow-600 dark:text-yellow-400 font-semibold underline">
            support@quicksin.in
          </a>
        </p>
      </div>
    </main>
  );
}