export default function page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">
        Shipping & Delivery Policy
      </h1>

      <p className="mb-6">
        Thank you for shopping with <strong>Quick (quicksin.in)</strong>.
        Quick is a multi-vendor marketplace where independent sellers list
        and sell products directly to buyers. This Shipping & Delivery Policy
        explains how orders are processed and delivered.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          1. Order Processing
        </h2>
        <p>
          Once an order is placed, the respective seller is responsible for
          processing and preparing the order for shipment. Orders are typically
          processed within <strong>1–3 business days</strong>, unless otherwise
          stated on the product page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          2. Shipping Responsibility
        </h2>
        <p>
          Shipping and delivery are managed by the individual sellers or their
          logistics partners. Delivery timelines may vary depending on the
          seller’s location, courier service, and delivery destination.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. Estimated Delivery Time
        </h2>
        <p>
          Estimated delivery times are displayed on the product page.
          Generally, domestic deliveries may take <strong>3–7 business days</strong>.
          Delays may occur due to unforeseen circumstances such as weather,
          courier delays, or high demand.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          4. Shipping Charges
        </h2>
        <p>
          Shipping charges, if applicable, will be displayed at checkout.
          Some sellers may offer free shipping depending on the product
          or promotional offers.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          5. Order Tracking
        </h2>
        <p>
          Once your order is shipped, tracking details will be provided via
          email or through your account dashboard (if applicable).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          6. Delivery Issues
        </h2>
        <p>
          If you experience delays, damaged goods, or non-delivery,
          please contact the seller directly through the platform.
          Quick may assist in resolving disputes when necessary.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          7. Incorrect Address
        </h2>
        <p>
          Buyers are responsible for providing accurate shipping details.
          Quick and the seller are not responsible for delivery failures
          due to incorrect or incomplete addresses.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          8. Contact Us
        </h2>
        <p>
          For shipping-related queries, contact us at{" "}
          <a
            href="mailto:support@quicksin.in"
            className="underline"
          >
            support@quicksin.in
          </a>
          .
        </p>
      </section>

      <p className="text-sm mt-10 opacity-80">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </main>
  );
}