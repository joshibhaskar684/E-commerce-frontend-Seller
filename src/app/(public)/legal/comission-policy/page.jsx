export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Commission & Payout Policy
      </h1>

      <section className="space-y-6">

        <div>
          <h2 className="font-semibold text-xl">1. Commission Structure</h2>
          <p>
            Quick charges a commission on each successful sale.
            The commission percentage may vary by category.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">2. Payment Processing</h2>
          <p>
            Payments are processed through secure third-party gateways.
            Transaction fees may apply.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">3. Payout Schedule</h2>
          <p>
            Seller payouts are processed within 7–14 business days
            after order completion and return window closure.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">4. Deductions</h2>
          <p>
            Quick may deduct commissions, refunds, chargebacks,
            penalties, or promotional fees before payout.
          </p>
        </div>

      </section>
    </main>
  );
}