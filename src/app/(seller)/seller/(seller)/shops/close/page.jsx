import { redirect } from "next/navigation";

/**
 * Closing a shop happens from the shop itself, behind a confirmation, so this
 * route has no page of its own. It stays as a redirect because it was linked
 * from older builds.
 */
export default function Page() {
    redirect("/seller/shops");
}
