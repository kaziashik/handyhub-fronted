"use client";

import { demoAccounts, type DemoAccount } from "@/lib/demo-accounts";

export function DemoLogin({
  selectedId,
  disabled,
  onSelect,
}: {
  selectedId: string | null;
  disabled?: boolean;
  onSelect: (account: DemoAccount) => void;
}) {
  return (
    <div className="rounded-3xl border bg-muted/30 p-3">
      <p className="mb-3 text-center text-xs font-medium tracking-[0.18em] text-muted-foreground">
        QUICK DEMO ACCESS
      </p>
      <div className="grid grid-cols-2 gap-2">
        {demoAccounts.map((account) => {
          const selected = account.id === selectedId;
          return (
            <button
              key={account.id}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              onClick={() => onSelect(account)}
              className={`rounded-2xl border bg-background px-3 py-3 text-center transition-colors ${
                selected ? "border-primary" : "border-border hover:bg-muted"
              }`}
            >
              <span className="block text-sm font-semibold text-primary">{account.title}</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">{account.detail}</span>
              <span className="mt-2 block text-xs font-medium">Demo login</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
