export default function LegalPortalPage() {
  const policies = [
    {
      title: "Master Seller Agreement",
      category: "Vendor Terms",
      description:
        "Comprehensive vendor contract governing seller registration, listing warranties, order SLAs, commissions, IP licensing, and termination terms.",
      href: "/legal/selleragreement",
    },
    {
      title: "Seller KYC & Verification Policy",
      category: "Compliance",
      description:
        "Mandatory verification document matrix for Proprietorships, Partnerships, LLPs, and Pvt Ltd companies (PAN, GSTIN, Bank accounts, FSSAI/Drug licenses).",
      href: "/legal/kyc",
    },
    {
      title: "Commission & Payout Policy",
      category: "Merchant Finances",
      description:
        "Detailed fee structure, category referral rates, closing fees, statutory TDS (u/s 194-O), TCS under GST (u/s 52), and weekly T+7 settlement schedules.",
      href: "/legal/comission-policy",
    },
    {
      title: "Prohibited & Restricted Products",
      category: "Catalog Standards",
      description:
        "Comprehensive listing rules outlining zero-tolerance prohibited items (counterfeits, weapons, illegal substances) and pre-approval regulatory categories.",
      href: "/legal/product-policy",
    },
    {
      title: "Marketplace Terms & Conditions",
      category: "Terms of Service",
      description:
        "General terms governing seller account usage, pricing transparency under Consumer Protection E-Commerce Rules 2020, and IT Act compliance.",
      href: "/legal/terms",
    },
    {
      title: "Seller Privacy Policy",
      category: "Data Governance",
      description:
        "DPDP Act 2023 compliant data governance policy explaining merchant data collection, bank details protection, logistics sharing, and data security.",
      href: "/legal/privacy",
    },
    {
      title: "Shipping & Logistics Policy",
      category: "Fulfillment",
      description:
        "Order dispatch SLAs (24-48 hours), packaging standards, platform integrated logistics vs self-shipment, courier weight disputes, and RTO rules.",
      href: "/legal/shipping-policy",
    },
    {
      title: "Cancellation & SAFE Fund Policy",
      category: "Returns & Claims",
      description:
        "Rules for customer returns (7-day window), seller cancellation penalties, non-returnable items, and the SAFE Fund dispute reimbursement mechanism.",
      href: "/legal/cancellation-policy",
    },
    {
      title: "Grievance Redressal Mechanism",
      category: "Statutory Disclosure",
      description:
        "Mandatory statutory disclosures under IT Act 2000 detailing the designated Grievance Officer, Nodal Officer contact details, and 48-hour response SLA.",
      href: "/legal/grievanceofficer",
    },
    {
      title: "Marketplace Disclaimer & IP Policy",
      category: "Legal & IP",
      description:
        "Section 79 IT Act intermediary liability exemption, product quality disclaimers, and Notice-and-Takedown procedures for trademark/copyright owners.",
      href: "/legal/disclaimer",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 bg-background text-foreground">
      {/* Hero */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-yellow-400 text-black rounded-full mb-4 shadow-sm">
          Quick Merchant Legal Hub
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Legal & Compliance Documentation
        </h1>
        <p className="mt-4 text-base opacity-80 max-w-2xl mx-auto leading-relaxed">
          Welcome to the central legal portal for Quick (quicksin.in) sellers. Below you will find all official policy agreements, financial rules, catalog standards, and compliance guidelines.
        </p>
      </div>

      {/* Policy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {policies.map((policy, idx) => (
          <a
            key={idx}
            href={policy.href}
            className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-card hover:border-yellow-400 hover:shadow-lg transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 px-2.5 py-1 rounded-md">
                  {policy.category}
                </span>
                <span className="text-xs text-opacity-60 group-hover:translate-x-1 transition-transform text-foreground">
                  Read Policy &rarr;
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors mb-2">
                {policy.title}
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                {policy.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/50 text-xs font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
              <span>View full agreement</span>
            </div>
          </a>
        ))}
      </div>

      {/* Support Banner */}
      <div className="mt-16 p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-center border border-border">
        <h3 className="text-xl font-bold mb-2">Need Legal or Compliance Clarification?</h3>
        <p className="text-sm opacity-80 max-w-xl mx-auto mb-4">
          Our Legal & Regulatory Desk is dedicated to assisting merchants with partner terms, tax certificates, and compliance queries.
        </p>
        <a
          href="mailto:support@quicksin.in"
          className="inline-block px-6 py-2.5 bg-yellow-400 text-black font-bold text-sm rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Contact Legal Desk (support@quicksin.in)
        </a>
      </div>
    </main>
  );
}
