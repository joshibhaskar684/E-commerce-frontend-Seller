// src/app/(admin)/admin/loading.jsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  // You can add any UI inside here, including a Skeleton, Spinner, or text.
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      <span className="ml-2 text-zinc-500 font-medium">Loading content...</span>
    </div>
  );
}
