// page.tsx (server component)
import { Suspense } from "react";
import ProductPageListComponents from "@/seller-components/ProductCompnents/ProductPageListComponets";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductPageListComponents />
    </Suspense>
  );
}