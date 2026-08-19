export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 bg-background text-foreground">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full mb-3">
          Catalog Standards
        </span>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          Prohibited & Restricted Products Policy
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Listing Guidelines, Regulatory Restrictions, and Prohibited Categories on Quick (quicksin.in)
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-zinc-800/60 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-6 mb-10 text-sm leading-relaxed">
        <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          ZERO TOLERANCE POLICY:
        </p>
        <p>
          Quick maintains a zero-tolerance policy against the listing or sale of illegal, hazardous, counterfeit, unapproved, or ethically prohibited items. Sellers are solely responsible for ensuring that every product listed complies with Indian laws, statutory certifications, and marketplace catalog guidelines.
        </p>
      </div>

      <section className="space-y-10">
        {/* Section 1 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">1</span>
            Strictly Prohibited Goods (Zero Exception)
          </h2>
          <p className="text-sm mb-4">
            Sellers are strictly forbidden from uploading, creating listings for, or selling any of the following product categories under any circumstances:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-red-600 dark:text-red-400 mb-2">
                Illegal & Controlled Substances
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                <li>Narcotics, illegal drugs, psychotropic substances under NDPS Act.</li>
                <li>Prescription-only medicines (Schedule H/H1/X drugs) without licensed pharmacy verification.</li>
                <li>Anabolic steroids, unverified dietary chemical supplements, or banned performance enhancers.</li>
              </ul>
            </div>

            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-red-600 dark:text-red-400 mb-2">
                Weapons, Hazardous & Explosive Items
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                <li>Firearms, ammunition, military gear, airguns, or replica weapons.</li>
                <li>Explosives, fireworks, pyrotechnics, or flammable liquids.</li>
                <li>Hazardous chemicals, toxic compounds, radioactive substances, or pesticides banned by CPCB.</li>
              </ul>
            </div>

            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-red-600 dark:text-red-400 mb-2">
                Counterfeit, Pirated & Infringing Items
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                <li>Fake, first-copy, knockoff, or unauthorized replica brand items.</li>
                <li>Pirated software, cracked operating systems, unauthorized media copies, or license key hacks.</li>
                <li>Products violating third-party active patents, registered designs, or brand trademarks.</li>
              </ul>
            </div>

            <div className="p-5 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-base text-red-600 dark:text-red-400 mb-2">
                Adult Content, Tobacco & Wildlife Goods
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                <li>Adult novelty goods, obscene publications, or explicit pornographic material under IT Act Sec 67.</li>
                <li>Cigarettes, cigars, e-cigarettes, vaping devices, hookahs, or tobacco products.</li>
                <li>Wildlife items, ivory, tiger teeth, protected animal skins/fur under the Wildlife Protection Act.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">2</span>
            Restricted Goods Requiring Prior License Clearance
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Certain categories may only be listed by approved sellers who submit valid statutory certifications prior to catalog creation:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Food Items & Edibles:</strong> Requires mandatory FSSAI license submission, transparent ingredient declaration, clear expiry dates, and veg/non-veg emblem labeling.
              </li>
              <li>
                <strong>Cosmetics & Skincare:</strong> Must comply with Drugs & Cosmetics Act rules, ingredient disclosure, and CDSCO safety norms.
              </li>
              <li>
                <strong>Electrical & Electronics:</strong> Must display compulsory BIS (Bureau of Indian Standards) registration marks and ISI certifications.
              </li>
              <li>
                <strong>Pre-Packaged Commodities:</strong> Must comply with Legal Metrology (Packaged Commodities) Rules, displaying net quantity, manufacturing date, country of origin, and customer care details.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">3</span>
            Automated Audits & Listing Takedown Workflow
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Quick utilizes automated keyword scanners, machine learning listing screeners, and manual compliance audits to verify listings:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Listings containing flagged keywords or unverified brand claims will be placed on mandatory hold pending review.</li>
              <li>Right Holders & Brand Owners can submit IP infringement takedown notices via our Grievance Portal.</li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-black text-sm px-2.5 py-0.5 rounded-full font-bold">4</span>
            Penalties for Violation
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Selling prohibited or illegal products will result in strict action without prior warning:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Immediate delisting of non-compliant products.</li>
              <li>Imposition of a listing penalty fee of up to ₹10,000 per violation.</li>
              <li>Permanent seller account suspension and forfeiture of pending settlement funds.</li>
              <li>Reporting of illegal goods sales to relevant law enforcement agencies and cybercrime authorities.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-12 p-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
        <p className="text-sm font-medium">
          Unsure whether your product requires statutory regulatory approval?
        </p>
        <p className="text-sm mt-1">
          Contact our Catalog Compliance Team at{" "}
          <a href="mailto:support@quicksin.in" className="text-yellow-600 dark:text-yellow-400 font-semibold underline">
            support@quicksin.in
          </a>
        </p>
      </div>
    </main>
  );
}