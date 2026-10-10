"use client";

import { dismissToast, getToasts, subscribeToasts, type ToastItem } from "@/lib/toast";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>(() => getToasts());

  useEffect(() => {
    setItems(getToasts());
    return subscribeToasts(() => setItems(getToasts()));
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[80] flex w-[min(100%-2rem,24rem)] -translate-x-1/2 flex-col gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="pointer-events-auto flex items-start gap-2 rounded-xl border border-primary/40 bg-background px-4 py-3 text-left text-foreground shadow-xl"
          onClick={() => dismissToast(item.id)}
        >
          {item.kind === "success" ? (
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          ) : (
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
          )}
          <span className="text-sm font-medium">{item.message}</span>
        </button>
      ))}
    </div>
  );
}
