import { AdminRouteSkeleton } from "@/components/Admin/shared/Skeleton";

/**
 * This route only redirects to the unified detail page, but a legacy bookmark
 * should still land on the detail shape rather than the list one it would
 * otherwise inherit from the parent segment.
 */
export default function Loading() {
    return <AdminRouteSkeleton variant="detail" />;
}
