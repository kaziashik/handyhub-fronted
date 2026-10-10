"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function OverviewChart({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-sm font-medium">Overview chart</h2>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={items} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} angle={-25} textAnchor="end" height={70} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={48} />
            <Tooltip />
            <Bar dataKey="value" name="Count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
