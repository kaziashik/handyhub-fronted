"use client";

import { getCustomers } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiErrorMessage } from "@/lib/api-error";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function CustomerList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const searchTerm = searchParams.get("searchTerm") ?? "";
  const customers = useQuery({
    queryKey: ["admin-customers", page, searchTerm],
    queryFn: () =>
      getCustomers({
        page,
        limit: 10,
        searchTerm: searchTerm || undefined,
      }),
  });

  function setQuery(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    if (!("page" in next)) params.delete("page");
    const query = params.toString();
    router.replace(query ? `/admin/customers?${query}` : "/admin/customers");
  }

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setQuery({ searchTerm: String(form.get("searchTerm") ?? "").trim() });
  }

  const totalPages = Math.max(customers.data?.meta?.totalPages ?? 0, 1);

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-wrap gap-2" onSubmit={onSearch}>
        <label className="sr-only" htmlFor="customer-search">
          Search customers
        </label>
        <Input id="customer-search" name="searchTerm" defaultValue={searchTerm} className="w-full max-w-sm" />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>
      {customers.isPending ? (
        <p className="text-sm text-muted-foreground">Loading customers...</p>
      ) : customers.isError ? (
        <p className="text-sm text-destructive">
          {apiErrorMessage(customers.error, "Could not load customers")}
        </p>
      ) : customers.data?.data.length ? (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Phone</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.data.data.map((customer) => (
                <tr key={customer.id} className="border-b last:border-0">
                  <td className="px-3 py-2">{customer.name}</td>
                  <td className="px-3 py-2">{customer.email}</td>
                  <td className="px-3 py-2">{customer.phone || "Not set"}</td>
                  <td className="px-3 py-2">{customer.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No customers match this search.</p>
      )}
      {!customers.isPending && !customers.isError ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" disabled={page <= 1} onClick={() => setQuery({ page: String(page - 1), searchTerm })}>
            Previous
          </Button>
          <p className="text-sm">Page {page} of {totalPages}</p>
          <Button type="button" variant="outline" disabled={page >= totalPages} onClick={() => setQuery({ page: String(page + 1), searchTerm })}>
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
