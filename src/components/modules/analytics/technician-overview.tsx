"use client";

import { getTechnicianAnalytics } from "@/api/analytics.api";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { apiErrorMessage } from "@/lib/api-error";
import type { TechnicianAnalytics } from "@/types";
import { useQuery } from "@tanstack/react-query";

const stats: { key: keyof TechnicianAnalytics; label: string; money?: boolean }[] =
  [
    { key: "totalSchedules", label: "Schedules" },
    { key: "publishedSchedules", label: "Published" },
    { key: "totalAppointments", label: "Appointments" },
    { key: "upcomingAppointments", label: "Upcoming" },
    { key: "ongoingAppointments", label: "Ongoing" },
    { key: "completedAppointments", label: "Completed" },
    { key: "cancelledAppointments", label: "Cancelled" },
    { key: "totaltechinicianEarnings", label: "Earnings", money: true },
    { key: "totaltechinicianRefunded", label: "Refunded", money: true },
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

export function TechnicianOverview() {
  const analytics = useQuery({
    queryKey: ["technician-analytics"],
    queryFn: getTechnicianAnalytics,
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
    <div className="flex flex-col gap-4">
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
    <OverviewChart
      items={stats.map((stat) => ({
        label: stat.label,
        value: Number(data?.[stat.key] ?? 0),
      }))}
    />
    </div>
  );
}
