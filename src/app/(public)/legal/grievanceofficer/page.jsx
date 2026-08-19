export default function page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Statutory Disclosure
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Grievance Redressal Mechanism
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Pursuant to Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-zinc-800/60 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-6 mb-10 text-sm leading-relaxed">
        <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          STATUTORY COMPLIANCE STATEMENT:
        </p>
        <p>
          Quick (quicksin.in) has appointed a designated Grievance Officer and Nodal Officer to address user complaints, merchant disputes, copyright infringement notices, and law enforcement requests in accordance with Indian statutory rules.
        </p>
      </div>

      <section className="space-y-8 text-foreground">
        {/* Officer Details Card */}
        <div className="border border-border rounded-xl p-6 bg-card">
          <h2 className="text-xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
            Designated Grievance Officer & Nodal Officer Details
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Grievance Officer Name:</strong> Mr. Bhaskar Joshi
            </p>
            <p>
              <strong>Designation:</strong> Head of Merchant Grievances & Regulatory Compliance
            </p>
            <p>
              <strong>Registered Office Address:</strong> Quick Marketplace Private Limited, Sem6 E-Commerce Operations Hub, New Delhi / Uttarakhand, India.
            </p>
            <p>
              <strong>Official Email Address:</strong>{" "}
              <a href="mailto:support@quicksin.in" className="text-yellow-600 dark:text-yellow-400 font-semibold underline">
                support@quicksin.in
              </a>
            </p>
            <p>
              <strong>Working Hours:</strong> Monday to Friday, 9:30 AM to 6:30 PM IST (excluding national holidays)
            </p>
          </div>
        </div>

        {/* SLA Timelines */}
        <div className="border border-border rounded-xl p-6 bg-card">
          <h2 className="text-xl font-bold mb-3">
            Complaint Handling SLA Timelines
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2 leading-relaxed opacity-90">
            <li>
              <strong>Acknowledgment SLA:</strong> Every grievance or complaint ticket received will be formally acknowledged within <strong>48 hours</strong> with a unique ticket reference number.
            </li>
            <li>
              <strong>Resolution SLA:</strong> The Grievance Officer shall investigate and resolve complaints within a maximum of <strong>15 days</strong> from receipt of full information.
            </li>
          </ul>
        </div>

        {/* Escalation Matrix */}
        <div className="border border-border rounded-xl p-6 bg-card">
          <h2 className="text-xl font-bold mb-3">
            Escalation Matrix for Sellers & Brand Owners
          </h2>
          <div className="space-y-2 text-sm leading-relaxed opacity-90">
            <p>
              <strong>Level 1 (Merchant Support):</strong> Log a ticket via the Seller Portal settings tab or email <code>support@quicksin.in</code>.
            </p>
            <p>
              <strong>Level 2 (Grievance Escalation):</strong> If unresolved after 5 days, email subject lines starting with <code>"ESCALATION TO GRIEVANCE OFFICER - Ticket #[ID]"</code> directly to <code>support@quicksin.in</code>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}