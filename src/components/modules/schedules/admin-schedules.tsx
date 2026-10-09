"use client";

import { getAllSchedules } from "@/api/schedule.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiErrorMessage } from "@/lib/api-error";
import type { ScheduleStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

const statuses: ScheduleStatus[] = ["DRAFT", "PUBLISHED"];

function listErrorMessage(error: unknown) {
  return apiErrorMessage(error, "Could not load schedules");
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function label(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function AdminSchedules() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const searchTerm = searchParams.get("search") ?? "";
  const scheduleStatus = searchParams.get("scheduleStatus") ?? "";
  const [searchInput, setSearchInput] = useState(searchTerm);

  const schedules = useQuery({
    queryKey: ["all-schedules", page, searchTerm, scheduleStatus],
    queryFn: () =>
      getAllSchedules({
        page,
        limit: 10,
        sortBy: "startDateTime",
        sortOrder: "asc",
        ...(searchTerm ? { searchTerm } : {}),
        ...(scheduleStatus ? { status: scheduleStatus } : {}),
      }),
  });

  function setListQuery(next: {
    page?: number;
    search?: string;
    scheduleStatus?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextPage = next.page ?? page;
    const nextSearch = next.search ?? searchTerm;
    const nextStatus = next.scheduleStatus ?? scheduleStatus;
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    if (!nextSearch) params.delete("search");
    else params.set("search", nextSearch);
    if (!nextStatus) params.delete("scheduleStatus");
    else params.set("scheduleStatus", nextStatus);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setListQuery({ search: searchInput.trim(), page: 1 });
  }

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-wrap items-end gap-3" onSubmit={handleSearch}>
        <label className="flex flex-col gap-1 text-sm">
          Search
          <Input
            name="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Technician name, email, or specialty"
          />
        </label>
        <Button type="submit" variant="outline">
          Search
        </Button>
        <label className="flex flex-col gap-1 text-sm">
          Status
          <select
            className="h-8 rounded-lg border bg-background px-2"
            value={scheduleStatus}
            onChange={(event) =>
              setListQuery({
                scheduleStatus: event.target.value,
                page: 1,
              })
            }
          >
            <option value="">All</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {label(status)}
              </option>
            ))}
          </select>
        </label>
      </form>

      {schedules.isPending ? (
        <p className="text-sm text-muted-foreground">Loading schedules...</p>
      ) : schedules.isError ? (
        <p className="text-sm text-destructive">
          {listErrorMessage(schedules.error)}
        </p>
      ) : (schedules.data?.data?.length ?? 0) === 0 ? (
        <p className="text-sm text-muted-foreground">No schedules.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {schedules.data?.data.map((schedule) => (
            <li key={schedule.id} className="rounded-lg border p-4">
              <p className="font-medium">{schedule.techinician.name}</p>
              <p className="text-sm text-muted-foreground">
                {schedule.techinician.specialization}
              </p>
              <Link
                href={`/admin/schedules/${schedule.id}`}
                className="text-sm underline-offset-4 hover:underline"
              >
                Details
              </Link>
              <p className="text-sm">
                {formatTime(schedule.startDateTime)} –{" "}
                {formatTime(schedule.endDateTime)}
              </p>
              <p className="text-sm">{label(schedule.status)}</p>
              <p className="text-sm text-muted-foreground">
                {schedule.availableSlots} of {schedule.totalSlots} slots open
              </p>
              {schedule.isDeleted ? (
                <p className="text-sm">Deleted</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {!schedules.isPending && !schedules.isError ? (
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1}
            onClick={() => setListQuery({ page: page - 1 })}
          >
            Previous
          </Button>
          <p className="text-sm text-muted-foreground">
            Page {schedules.data?.meta?.page ?? page} of{" "}
            {Math.max(schedules.data?.meta?.totalPages ?? 0, 1)}
          </p>
          <Button
            type="button"
            variant="outline"
            disabled={page >= Math.max(schedules.data?.meta?.totalPages ?? 0, 1)}
            onClick={() => setListQuery({ page: page + 1 })}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
