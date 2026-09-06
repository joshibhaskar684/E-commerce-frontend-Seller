import { redirect } from "next/navigation";

// Seller details are handled by a single status aware page now.
export default async function Page({ params }) {
    const { sellerId } = await params;

    redirect(`/admin/sellers/${sellerId}?from=suspended`);
}
