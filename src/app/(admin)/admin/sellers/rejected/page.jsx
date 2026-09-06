import { redirect } from "next/navigation";

// The rejected queue is now a tab on /admin/sellers, so the old route only
// forwards to it with the filter pre-applied.
export default async function Page({ searchParams }) {
    const params = (await searchParams) ?? {};
    const pageno = params.pageno ?? "1";
    const pagesize = params.pagesize ?? "12";

    redirect(`/admin/sellers?status=rejected&pageno=${pageno}&pagesize=${pagesize}`);
}
