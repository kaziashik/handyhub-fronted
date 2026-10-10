"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error(error.message || "Something went wrong. Please try again.");
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-start justify-center gap-4 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="text-sm leading-6 text-muted-foreground">
        This page could not be shown. You can try again, or return home.
      </p>
      <div className="flex gap-2">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button variant="outline" render={<a href="/">Home</a>} nativeButton={false} />
      </div>
    </div>
  );
}
