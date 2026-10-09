export function OverviewChart({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  const peak = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-sm font-medium">Overview chart</h2>
      <div className="mt-4 flex h-48 items-end gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-36 w-full items-end">
              <div
                className="w-full rounded-md bg-primary"
                style={{ height: `${Math.max((item.value / peak) * 100, item.value > 0 ? 8 : 0)}%` }}
                title={`${item.label}: ${item.value}`}
              />
            </div>
            <p className="w-full truncate text-center text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
