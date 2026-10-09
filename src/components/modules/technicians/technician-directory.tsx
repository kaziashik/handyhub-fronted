"use client";

import { getPublicTechnicians } from "@/api/technician.api";
import { TechnicianCard } from "@/components/modules/technicians/technician-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiErrorMessage } from "@/lib/api-error";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function TechnicianDirectory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const searchTerm = searchParams.get("searchTerm") ?? "";
  const specialization = searchParams.get("specialization") ?? "";
  const minExperience = searchParams.get("minExperience") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const technicians = useQuery({
    queryKey: ["public-technicians", page, searchTerm, specialization, minExperience, sortBy, sortOrder],
    queryFn: () =>
      getPublicTechnicians({
        page,
        limit: 9,
        searchTerm: searchTerm || undefined,
        specialization: specialization || undefined,
        minExperience: minExperience || undefined,
        sortBy,
        sortOrder,
      }),
  });

  function updateQuery(next: Record<string, string>, resetPage = true) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    if (resetPage) params.delete("page");
    const query = params.toString();
    router.replace(query ? `/technicians?${query}` : "/technicians");
  }

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateQuery({ searchTerm: String(form.get("searchTerm") ?? "").trim() });
  }

  const totalPages = Math.max(technicians.data?.meta?.totalPages ?? 0, 1);

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-wrap gap-2" onSubmit={onSearch}>
        <label className="sr-only" htmlFor="technician-search">
          Search technicians
        </label>
        <Input
          id="technician-search"
          name="searchTerm"
          defaultValue={searchTerm}
          placeholder="Search name or specialty"
          className="w-full max-w-sm"
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>
      <div className="flex flex-wrap gap-2">
        <label className="flex items-center gap-2 text-sm">
          Specialty
          <Input
            value={specialization}
            onChange={(event) => updateQuery({ specialization: event.target.value.trim() })}
            className="w-40"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Minimum years
          <select
            className="h-8 rounded-lg border bg-background px-2 text-sm"
            value={minExperience}
            onChange={(event) => updateQuery({ minExperience: event.target.value })}
          >
            <option value="">Any</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          Sort
          <select
            className="h-8 rounded-lg border bg-background px-2 text-sm"
            value={`${sortBy}:${sortOrder}`}
            onChange={(event) => {
              const [nextSortBy, nextOrder] = event.target.value.split(":");
              updateQuery({ sortBy: nextSortBy, sortOrder: nextOrder });
            }}
          >
            <option value="createdAt:desc">Newest</option>
            <option value="name:asc">Name</option>
            <option value="experienceYears:desc">Experience</option>
            <option value="consultationFee:asc">Fee</option>
          </select>
        </label>
      </div>

      {technicians.isPending ? (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <li key={index} className="h-80 animate-pulse rounded-lg border bg-muted" />
          ))}
        </ul>
      ) : technicians.isError ? (
        <p className="text-sm text-destructive">
          {apiErrorMessage(technicians.error, "Could not load technicians")}
        </p>
      ) : technicians.data?.data.length ? (
        <ul className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technicians.data.data.map((technician) => (
            <li key={technician.id}>
              <TechnicianCard technician={technician} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No approved technicians match this search.</p>
      )}

      {!technicians.isPending && !technicians.isError ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" disabled={page <= 1} onClick={() => updateQuery({ page: page - 1 <= 1 ? "" : String(page - 1) }, false)}>
            Previous
          </Button>
          <p className="text-sm">
            Page {page} of {totalPages}
          </p>
          <Button
            type="button"
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => updateQuery({ page: String(page + 1) }, false)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
