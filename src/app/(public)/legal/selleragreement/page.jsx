export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Seller Agreement
      </h1>

      <p className="mb-6">
        This Seller Agreement (“Agreement”) is entered into between 
        <strong> Quick (quicksin.in)</strong> and the registered seller (“Seller”).
        By registering as a seller, you agree to the following terms:
      </p>

      <section className="space-y-6">

        <div>
          <h2 className="font-semibold text-xl">1. Seller Eligibility</h2>
          <p>
            Seller must be legally capable of entering into contracts
            and must comply with Indian laws including GST and consumer laws.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">2. Seller Obligations</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Provide accurate product listings</li>
            <li>Ensure product legality and authenticity</li>
            <li>Process and ship orders on time</li>
            <li>Handle returns and refunds fairly</li>
            <li>Comply with tax regulations</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-xl">3. Prohibited Conduct</h2>
          <p>
            Sellers must not list counterfeit, illegal, or restricted products
            or engage in fraudulent practices.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">4. Commission & Fees</h2>
          <p>
            Quick may charge commission and/or service fees
            as per the Commission & Payout Terms.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">5. Suspension & Termination</h2>
          <p>
            Quick reserves the right to suspend or terminate
            seller accounts for policy violations.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">6. Limitation of Liability</h2>
          <p>
            Quick acts only as a marketplace intermediary and is not liable
            for product quality, legality, or disputes.
          </p>
        </div>

      </section>
    </main>
  );
}