export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Customer Service & Returns
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Cancellation, Return & SAFE Protection Policy
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Rules for Cancellations, Customer Return Eligibility & Seller Damage Reimbursement Fund on Quick (quicksin.in)
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-zinc-800/60 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-6 mb-10 text-sm leading-relaxed">
        <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          FAIR MARKETPLACE BALANCE:
        </p>
        <p>
          Quick maintains balanced guidelines that protect buyers against defective or wrong items while safeguarding honest sellers against fraudulent customer returns through our dedicated Seller Protection (SAFE) Reimbursement Fund.
        </p>
      </div>

      <section className="space-y-10">
        {/* Section 1 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">1</span>
            Order Cancellation Rules & Penalties
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Order cancellation requests are subject to strict stage-wise processing:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Buyer Cancellation Before Dispatch:</strong> Buyers may cancel orders penalty-free prior to shipment confirmation.
              </li>
              <li>
                <strong>Seller Out-of-Stock Cancellation Penalty:</strong> If a seller cancels a confirmed order due to stock unavailability or pricing mistake, Quick charges a stockout cancellation penalty (5% of item value, minimum ₹50 per order) to offset customer compensation coupons.
              </li>
              <li>
                <strong>Cancellation After Dispatch:</strong> Once shipped, orders cannot be cancelled in-transit. Buyers must follow the standard return process upon delivery.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">2</span>
            Customer Return Window & Conditions
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Sellers agree to accept buyer returns meeting the following criteria:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Return Window:</strong> Buyers may request returns within <strong>7 days</strong> of delivery.
              </li>
              <li>
                <strong>Valid Return Reasons:</strong> Damaged product upon delivery, defective functional performance, wrong product size/color received, or product substantially differing from listing description.
              </li>
              <li>
                <strong>Seller Fault vs Buyer Dislike:</strong> For seller-fault returns (damaged/wrong item), return freight is charged to the seller. For buyer dislike returns (if permitted by category), return shipping costs are borne by the buyer.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">3</span>
            Non-Returnable Product Categories
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Due to hygiene, safety, and operational reasons, the following items are non-returnable unless delivered damaged:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 opacity-90">
              <li>Personal care, cosmetics, innerwear, and intimate apparel.</li>
              <li>Perishable food, snacks, and consumable beverages.</li>
              <li>Customized, made-to-order, or personalized goods.</li>
              <li>Digital software licenses, downloadable content, or e-gift cards.</li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">4</span>
            Seller Protection (SAFE Fund) & Return Dispute Claims
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              If a seller receives a returned package that has been damaged, used, swapped with a different item, or has missing parts:
            </p>
            <div className="p-5 border border-yellow-300 dark:border-yellow-800 rounded-xl bg-yellow-50/50 dark:bg-zinc-800/80">
              <h3 className="font-bold text-base text-yellow-800 dark:text-yellow-300 mb-2">
                SAFE Claim Submission Process:
              </h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs opacity-90">
                <li><strong>Claim Timeline:</strong> Raise a SAFE dispute ticket within <strong>72 hours</strong> of return package delivery.</li>
                <li><strong>Evidence Requirement:</strong> Upload clear unboxing video recordings showing the sealed courier outer bag, AWB barcode label, and damaged contents.</li>
                <li><strong>Reimbursement SLA:</strong> Quick Claims Committee reviews disputes within 5 business days and approves up to <strong>100% reimbursement</strong> of selling price credited directly to seller payout.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">5</span>
            Refund Processing SLA
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Approved refunds are credited to the buyer’s original payment method within <strong>5 to 7 business days</strong> after seller return verification or claim settlement.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 p-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
        <p className="text-sm font-medium">
          Need to submit a SAFE dispute claim for a damaged return parcel?
        </p>
        <p className="text-sm mt-1">
          Raise a ticket on the Seller Dashboard or email{" "}
          <a href="mailto:support@quicksin.in" className="text-yellow-600 dark:text-yellow-400 font-semibold underline">
            support@quicksin.in
          </a>
        </p>
      </div>
    </main>
  );
}