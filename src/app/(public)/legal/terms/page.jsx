export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Terms & Conditions
      </h1>

      <p className="text-center mb-10 text-sm opacity-80">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-8">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using <strong>Quick (quicksin.in)</strong>,
            you agree to comply with these Terms & Conditions.
            If you do not agree, please do not use our platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. About Quick
          </h2>
          <p>
            Quick is a multi-vendor eCommerce marketplace that connects
            independent sellers with buyers. Quick does not manufacture,
            own, or directly sell products unless explicitly stated.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. User Accounts
          </h2>
          <p>Users agree to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Provide accurate and updated information</li>
            <li>Maintain account confidentiality</li>
            <li>Be responsible for activities under their account</li>
            <li>Not engage in fraudulent or unlawful activities</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Buyer Responsibilities
          </h2>
          <p>
            Buyers are responsible for reviewing product details carefully
            before purchase and providing accurate shipping information.
            Buyers must comply with return and refund policies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Seller Responsibilities
          </h2>
          <p>
            Sellers are responsible for:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Accurate product listings</li>
            <li>Order fulfillment and shipping</li>
            <li>Product quality and legality</li>
            <li>Handling returns and refunds as per policy</li>
          </ul>
          <p className="mt-2">
            Sellers must comply with applicable laws and marketplace guidelines.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Payments & Fees
          </h2>
          <p>
            All payments are processed via secure third-party payment gateways.
            Quick may charge commission or service fees to sellers.
          </p>
          <p className="mt-2">
            In case of fraudulent transactions or chargebacks, Quick reserves
            the right to suspend accounts or recover losses.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Returns & Refunds
          </h2>
          <p>
            Returns and refunds are governed by our Cancellation & Refund Policy.
            Quick may assist in dispute resolution but final responsibility
            lies with the seller unless otherwise stated.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Intellectual Property
          </h2>
          <p>
            All platform content including logos, branding, website design,
            and software is owned by Quick.
            Unauthorized use is prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            9. Limitation of Liability
          </h2>
          <p>
            Quick is not liable for product defects, delays, losses,
            or damages caused by third-party sellers.
            The platform is provided “as-is” without warranties of any kind.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            10. Account Suspension
          </h2>
          <p>
            We reserve the right to suspend or terminate accounts
            involved in policy violations, fraudulent activity,
            or misuse of the platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            11. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and interpreted
            in accordance with the laws of India.
            Any disputes shall be subject to the jurisdiction
            of the appropriate courts in India.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            12. Changes to Terms
          </h2>
          <p>
            We may update these Terms at any time.
            Continued use of the platform indicates acceptance
            of the revised Terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            13. Contact Us
          </h2>
          <p>
            For questions regarding these Terms, contact us at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a
                href="mailto:support@quicksin.in"
                className="underline"
              >
                support@quicksin.in
              </a>
            </li>
            <li>Website: https://quicksin.in</li>
          </ul>
        </div>

      </section>
    </main>
  );
}