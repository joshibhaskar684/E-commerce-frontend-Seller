export default function page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Prohibited Products Policy
      </h1>

      <section className="space-y-6">

        <p>
          Sellers are strictly prohibited from listing or selling the following:
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>Illegal drugs or narcotics</li>
          <li>Weapons, explosives, or firearms</li>
          <li>Counterfeit or pirated goods</li>
          <li>Stolen property</li>
          <li>Adult or obscene content</li>
          <li>Wildlife or protected animal products</li>
          <li>Prescription medicines without license</li>
        </ul>

        <p className="mt-4">
          Violation may result in immediate account suspension
          and reporting to authorities.
        </p>

      </section>
    </main>
  );
}