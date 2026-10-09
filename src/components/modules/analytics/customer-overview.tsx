"use client";

import { getCustomerAnalytics } from "@/api/analytics.api";
import { apiErrorMessage } from "@/lib/api-error";
import type { CustomerAnalytics } from "@/types";
import { useQuery } from "@tanstack/react-query";

const stats: { key: keyof CustomerAnalytics; label: string; money?: boolean }[] =
  [
    { key: "totalAppointments", label: "Total" },
    { key: "upcomingAppointments", label: "Upcoming" },
    { key: "completedAppointments", label: "Completed" },
    { key: "cancelledAppointments", label: "Cancelled" },
    { key: "totalAmountSpent", label: "Amount spent", money: true },
    { key: "totalRefunded", label: "Refunded", money: true },
  ];

function analyticsErrorMessage(error: unknown) {
  return apiErrorMessage(error, "Could not load your overview");
}

function formatAmount(value: number) {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function CustomerOverview() {
  const analytics = useQuery({
    queryKey: ["customer-analytics"],
    queryFn: getCustomerAnalytics,
  });

  if (analytics.isPending) {
    return <p className="text-sm text-muted-foreground">Loading overview...</p>;
  }

  if (analytics.isError) {
    return (
      <p className="text-sm text-destructive">
        {analyticsErrorMessage(analytics.error)}
      </p>
    );
  }

  const data = analytics.data?.data;

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <li key={stat.key} className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-2xl font-semibold">
            {stat.money ? formatAmount(data?.[stat.key] ?? 0) : data?.[stat.key] ?? 0}
          </p>
        </li>
      ))}
    </ul>
  );
}
