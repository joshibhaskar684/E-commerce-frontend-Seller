

export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Data Governance
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Seller Privacy Policy
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Compliant with Digital Personal Data Protection (DPDP) Act, 2023 & IT (Reasonable Security Practices) Rules, 2011
        </p>
      </div>

      <section className="space-y-8 text-foreground">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Scope & Overview</h2>
          <p className="text-sm leading-relaxed opacity-90">
            This Privacy Policy describes how <strong>Quick (quicksin.in)</strong> collects, processes, stores, and protects personal and business data provided by registered merchants, seller representatives, and prospective vendors. By using the Quick Seller Portal, you consent to the data practices described herein.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <p className="text-sm leading-relaxed opacity-90 mb-2">
            To onboard, verify, and process financial payouts for sellers, Quick collects the following data categories:
          </p>
          <ul className="list-disc pl-6 text-sm space-y-1.5 opacity-90">
            <li><strong>Personal & Business Identification:</strong> Merchant full name, business name, registered address, official email, phone number, PAN card details, Aadhaar number (redacted/masked), and passport/Voter ID details.</li>
            <li><strong>Tax & Regulatory Data:</strong> GSTIN certificate details, FSSAI license numbers, Drug licenses, and Udyam MSME registration numbers.</li>
            <li><strong>Financial & Bank Info:</strong> Bank account holder name, account number, IFSC code, cancelled cheque images, and settlement transaction history.</li>
            <li><strong>Technical & System Logs:</strong> Device IP address, browser type, operating system, login timestamps, and API call logs.</li>
            <li><strong>Customer Fulfillment Data:</strong> Order details, dispatch manifests, buyer shipping addresses provided strictly for logistics fulfillment.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Purpose of Processing & Usage</h2>
          <p className="text-sm leading-relaxed opacity-90 mb-2">
            Seller data is collected strictly for lawful purposes including:
          </p>
          <ul className="list-disc pl-6 text-sm space-y-1.5 opacity-90">
            <li>Onboarding verification and statutory Know Your Customer (KYC) compliance.</li>
            <li>Facilitating order routing, dispatch generation, and customer communication.</li>
            <li>Processing bank account settlement payouts, commission calculation, and tax withholding (TDS/TCS).</li>
            <li>Detecting, preventing, and investigating fraud, illegal activity, or catalog violations.</li>
            <li>Filing statutory tax returns (GSTR-8, Form 16A) with Indian income tax and GST authorities.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Data Sharing & Third-Party Disclosure</h2>
          <p className="text-sm leading-relaxed opacity-90 mb-2">
            Quick strictly does not sell seller personal data. Information is disclosed only to:
          </p>
          <ul className="list-disc pl-6 text-sm space-y-1.5 opacity-90">
            <li><strong>Logistics & Delivery Partners:</strong> Sharing buyer shipping details with assigned courier partners for package delivery.</li>
            <li><strong>Payment Gateways & Banking Partners:</strong> Transmitting bank account details securely to verified payment aggregators (Cashfree, Razorpay, Paytm) for payout processing.</li>
            <li><strong>Statutory & Regulatory Authorities:</strong> Reporting transaction summaries and tax details to GSTN, Income Tax Department, or law enforcement under legal mandate or court order.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Data Security & Storage Controls</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Quick implements robust administrative, technical, and physical security measures, including AES-256 encryption at rest, TLS 1.3 encryption in transit, strict access control, and firewalls to safeguard financial and KYC data stored on servers within Indian data centers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Data Retention Period</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Financial records, tax deduction receipts, GST invoices, and merchant KYC records are retained for a minimum mandatory statutory period of <strong>8 years</strong> as required by Indian income tax, GST, and corporate accounting laws, post which records are permanently purged.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Data Principal Rights & Grievances</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Under the DPDP Act 2023, sellers have the right to request access to their personal data, request correction of inaccurate business details, or log data protection grievances with our Data Protection Officer at <code>support@quicksin.in</code>.
          </p>
        </div>
      </section>
    </main>
  );
}