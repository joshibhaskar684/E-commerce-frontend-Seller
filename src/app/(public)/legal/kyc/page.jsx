export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Seller KYC & Verification Policy
      </h1>

      <section className="space-y-6">

        <div>
          <h2 className="font-semibold text-xl">1. KYC Requirement</h2>
          <p>
            All sellers must complete identity and business verification
            before listing products.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">2. Required Documents</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>PAN Card</li>
            <li>Aadhaar Card</li>
            <li>GST Registration (if applicable)</li>
            <li>Bank Account Details</li>
            <li>Business Registration (if applicable)</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-xl">3. Verification Process</h2>
          <p>
            Quick reserves the right to verify submitted documents
            and reject applications that fail verification.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">4. Ongoing Compliance</h2>
          <p>
            Sellers may be required to update KYC documents periodically.
          </p>
        </div>

      </section>
    </main>
  );
}