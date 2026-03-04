export default function page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">
        Cancellation & Refund Policy
      </h1>

      <p className="mb-6">
        Quick (quicksin.in) is a multi-vendor eCommerce platform that connects
        sellers and buyers. We aim to provide a transparent and fair
        cancellation and refund policy for all users on our platform.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Order Cancellation Policy
        </h2>
        <p>
          Buyers may request order cancellation within <strong>24 hours</strong>{" "}
          of placing the order. Cancellation requests will only be accepted if
          the seller has not already processed or shipped the order.
        </p>
        <p className="mt-2">
          Once the product has been shipped, cancellation may not be possible.
          In such cases, buyers may refer to the return policy (if applicable).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Seller Responsibility
        </h2>
        <p>
          Since Quick is a marketplace platform, individual sellers are
          responsible for fulfilling orders, shipping products, and handling
          returns/refunds according to their specific policies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Refund & Return Policy
        </h2>
        <p>
          Refunds or returns may be requested if:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>The product received is damaged or defective.</li>
          <li>The wrong product was delivered.</li>
          <li>The product significantly differs from its description.</li>
        </ul>

        <p className="mt-3">
          Buyers must raise a return or refund request within{" "}
          <strong>2–3 days</strong> of delivery.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Non-Returnable Items
        </h2>
        <p>
          Certain items may not be eligible for return, including:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Personal care products</li>
          <li>Perishable goods</li>
          <li>Customized or made-to-order items</li>
          <li>Digital products or downloadable items</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Refund Processing
        </h2>
        <p>
          Once the seller approves the refund request and the returned product
          (if applicable) is received and verified, the refund will be processed
          within <strong>5–7 business days</strong>.
        </p>
        <p className="mt-2">
          Refunds will be credited to the original payment method used during
          purchase.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Dispute Resolution
        </h2>
        <p>
          If a buyer and seller are unable to resolve an issue, Quick reserves
          the right to review the case and make a final decision based on
          available evidence.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Contact Us
        </h2>
        <p>
          For cancellation, return, or refund-related queries, please contact
          us at{" "}
          <a
            href="mailto:support@quicksin.in"
            className="underline"
          >
            support@quicksin.in
          </a>
          .
        </p>
      </section>

      <p className="text-sm mt-10">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </main>
  );
}