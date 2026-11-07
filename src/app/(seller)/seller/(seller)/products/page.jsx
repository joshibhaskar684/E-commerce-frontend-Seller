import { Suspense } from "react";
import ProductPageListComponents from "@/seller-components/ProductCompnents/ProductPageListComponets";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductPageListComponents />
    </Suspense>
  );
}
