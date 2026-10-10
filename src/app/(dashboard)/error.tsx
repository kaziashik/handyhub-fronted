"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error(error.message || "This dashboard page could not be loaded.");
  }, [error]);

  return (
    <div className="flex max-w-lg flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">This page could not be loaded</h1>
      <p className="text-sm leading-6 text-muted-foreground">
        The request failed. Try again, or open another section from the menu.
      </p>
      <Button type="button" onClick={reset} className="w-fit">
        Try again
      </Button>
    </div>
  );
}
