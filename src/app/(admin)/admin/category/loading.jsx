import { AdminRouteSkeleton } from "@/components/Admin/shared/Skeleton";

/**
 * Shown while this route's payload is on the wire — including the first, slow
 * compile in dev — so a navigation never lands on an empty pane.
 */
export default function Loading() {
    return <AdminRouteSkeleton variant="tree" />;
}
