

export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Privacy Policy
      </h1>

      <p className="text-center mb-10 text-sm opacity-80">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-8">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. Introduction
          </h2>
          <p>
            Welcome to <strong>Quick (quicksin.in)</strong>. We value your privacy
            and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Personal details (name, email address, phone number)</li>
            <li>Shipping and billing address</li>
            <li>Payment details (processed securely via third-party gateways)</li>
            <li>Seller business information (GST, bank details, store details)</li>
            <li>Order history and transaction data</li>
            <li>Device information, IP address, and cookies</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. How We Use Your Information
          </h2>
          <p>Your information may be used to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Process and manage orders</li>
            <li>Connect buyers with sellers</li>
            <li>Provide customer support</li>
            <li>Improve platform functionality and user experience</li>
            <li>Send transactional emails and updates</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Sharing of Information
          </h2>
          <p>
            We do not sell your personal information. However, we may share
            data with:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Sellers (to fulfill orders)</li>
            <li>Payment gateway providers</li>
            <li>Logistics and delivery partners</li>
            <li>Service providers assisting in platform operations</li>
            <li>Authorities when required by law</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Cookies & Tracking Technologies
          </h2>
          <p>
            We use cookies and analytics tools to enhance user experience,
            analyze traffic, and improve our services. You can manage cookie
            preferences through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Data Security
          </h2>
          <p>
            We implement reasonable technical and organizational measures
            to protect your data. However, no method of transmission over
            the internet is 100% secure.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. User Rights
          </h2>
          <p>You may have the right to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Access or request a copy of your personal data</li>
            <li>Request correction or deletion of data</li>
            <li>Withdraw consent for marketing communications</li>
            <li>Deactivate your account</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Seller Data Responsibility
          </h2>
          <p>
            Sellers using Quick are responsible for protecting customer
            information shared for order fulfillment and must comply with
            applicable data protection laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            9. Third-Party Links
          </h2>
          <p>
            Our platform may contain links to third-party websites.
            We are not responsible for their privacy practices.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            10. Children’s Privacy
          </h2>
          <p>
            Our platform is not intended for individuals under 18 years
            of age. We do not knowingly collect personal information from minors.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            11. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time.
            Updates will be posted on this page with a revised date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            12. Contact Us
          </h2>
          <p className="mb-2">
            If you have any questions about this Privacy Policy, contact us at:
          </p>
          <ul className="space-y-1">
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