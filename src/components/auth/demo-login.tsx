"use client";

import { demoAccounts, type DemoAccount } from "@/lib/demo-accounts";

export function DemoLogin({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (account: DemoAccount) => void;
}) {
  return (
    <div className="rounded-xl border bg-muted/40 p-3">
      <p className="mb-3 text-center text-xs font-medium tracking-widest text-muted-foreground">
        QUICK DEMO ACCESS
      </p>
      <div className="grid grid-cols-2 gap-2">
        {demoAccounts.map((account) => {
          const selected = account.id === selectedId;
          return (
            <button
              key={account.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(account)}
              className={`rounded-lg border bg-background px-2 py-3 text-left transition-colors ${
                selected ? "border-primary" : "border-border hover:bg-muted"
              }`}
            >
              <span className="block text-sm font-semibold text-primary">
                {account.title}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {account.detail}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
