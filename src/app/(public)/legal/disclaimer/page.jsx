export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Disclaimer
      </h1>

      <p className="text-center mb-10 text-sm opacity-80">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-8">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. General Information
          </h2>
          <p>
            The information provided by <strong>Quick (quicksin.in)</strong>
            (“we”, “our”, or “us”) on this website is for general informational
            purposes only. While we strive to keep information accurate and
            updated, we make no guarantees regarding completeness, reliability,
            or accuracy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Marketplace Platform
          </h2>
          <p>
            Quick operates as a multi-vendor eCommerce platform that connects
            buyers and independent sellers. We do not manufacture, store, or
            directly sell the products listed by third-party sellers unless
            explicitly stated.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Product Information
          </h2>
          <p>
            Product descriptions, images, pricing, and specifications are
            provided by individual sellers. Quick is not responsible for
            inaccuracies, misrepresentations, or errors in product listings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. No Guarantees
          </h2>
          <p>
            We do not guarantee product availability, delivery timelines,
            quality, or suitability for a specific purpose. All purchases are
            made at your own discretion and risk.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. External Links
          </h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for their content, policies, or practices. Accessing
            such links is done at your own risk.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            Quick shall not be held liable for any direct, indirect,
            incidental, or consequential damages arising from the use of our
            platform, including issues related to products sold by third-party
            sellers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Technical Issues
          </h2>
          <p>
            We do not guarantee uninterrupted or error-free access to the
            platform. Temporary downtime may occur due to maintenance or
            technical reasons.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Intellectual Property
          </h2>
          <p>
            All platform content including logos, design elements, and website
            structure are the property of Quick. Unauthorized use,
            reproduction, or distribution is prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            9. User Responsibility
          </h2>
          <p>
            Users agree to use the platform lawfully and responsibly. Any
            misuse, fraudulent activity, or violation of terms may result in
            account suspension or termination.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            10. Contact Us
          </h2>
          <p className="mb-2">
            If you have any questions regarding this Disclaimer, contact us at:
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