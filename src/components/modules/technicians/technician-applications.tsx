"use client";

import { approveTechnician, getAllTechnicians } from "@/api/technician.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiErrorMessage } from "@/lib/api-error";
import type { TechnicianVerificationStatus } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

const statuses: TechnicianVerificationStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
];

function listErrorMessage(error: unknown) {
  return apiErrorMessage(error, "Could not load technicians");
}

function label(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function reviewErrorMessage(error: unknown) {
  return apiErrorMessage(error, "Could not review the application");
}

export function TechnicianApplications() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const searchTerm = searchParams.get("search") ?? "";
  const verificationStatus = searchParams.get("verificationStatus") ?? "";
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewAction, setReviewAction] = useState<"APPROVED" | "REJECTED" | null>(
    null,
  );
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [reviewError, setReviewError] = useState<{
    id: string;
    message: string;
  } | null>(null);

  async function handleReview(
    techinicianId: string,
    status: "APPROVED" | "REJECTED",
  ) {
    const rejectionReason = reason.trim();
    setReviewError(null);
    if (status === "REJECTED" && !rejectionReason) {
      setReviewError({
        id: techinicianId,
        message: "Rejection reason is required.",
      });
      return;
    }

    setReviewingId(techinicianId);
    setReviewAction(status);
    try {
      await approveTechnician({
        techinicianId,
        verificationStatus: status,
        ...(status === "REJECTED" ? { rejectionReason } : {}),
      });
      await queryClient.invalidateQueries({ queryKey: ["all-technicians"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
      setRejectingId(null);
      setReason("");
    } catch (error) {
      setReviewError({
        id: techinicianId,
        message: reviewErrorMessage(error),
      });
    } finally {
      setReviewingId(null);
      setReviewAction(null);
    }
  }

  const technicians = useQuery({
    queryKey: ["all-technicians", page, searchTerm, verificationStatus],
    queryFn: () =>
      getAllTechnicians({
        page,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
        ...(searchTerm ? { searchTerm } : {}),
        ...(verificationStatus ? { verificationStatus } : {}),
      }),
  });

  function setListQuery(next: {
    page?: number;
    search?: string;
    verificationStatus?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextPage = next.page ?? page;
    const nextSearch = next.search ?? searchTerm;
    const nextStatus = next.verificationStatus ?? verificationStatus;
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    if (!nextSearch) params.delete("search");
    else params.set("search", nextSearch);
    if (!nextStatus) params.delete("verificationStatus");
    else params.set("verificationStatus", nextStatus);
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
            placeholder="Name, email, specialty, or license"
          />
        </label>
        <Button type="submit" variant="outline">
          Search
        </Button>
        <label className="flex flex-col gap-1 text-sm">
          Verification
          <select
            className="h-8 rounded-lg border bg-background px-2"
            value={verificationStatus}
            onChange={(event) =>
              setListQuery({
                verificationStatus: event.target.value,
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

      {technicians.isPending ? (
        <p className="text-sm text-muted-foreground">Loading technicians...</p>
      ) : technicians.isError ? (
        <p className="text-sm text-destructive">
          {listErrorMessage(technicians.error)}
        </p>
      ) : (technicians.data?.data?.length ?? 0) === 0 ? (
        <p className="text-sm text-muted-foreground">No technicians.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {technicians.data?.data.map((technician) => (
            <li key={technician.id} className="rounded-lg border p-4">
              <p className="font-medium">{technician.name}</p>
              <p className="text-sm text-muted-foreground">{technician.email}</p>
              <p className="text-sm">{technician.specialization}</p>
              <p className="text-sm">License {technician.licenseNumber}</p>
              <p className="text-sm">{label(technician.verificationStatus)}</p>
              <p className="text-sm">
                {technician.user.emailVerified
                  ? "Email verified"
                  : "Email not verified"}
              </p>
              {technician.rejectionReason ? (
                <p className="text-sm">{technician.rejectionReason}</p>
              ) : null}
              {technician.verificationStatus === "PENDING" &&
              technician.user.emailVerified ? (
                <div className="mt-3 flex flex-col items-start gap-2">
                  {reviewError?.id === technician.id ? (
                    <p className="text-sm text-destructive">{reviewError.message}</p>
                  ) : null}
                  {rejectingId === technician.id ? (
                    <label className="flex w-full max-w-sm flex-col gap-1 text-sm">
                      Rejection reason
                      <Input
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        disabled={reviewingId !== null}
                      />
                    </label>
                  ) : null}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      disabled={reviewingId !== null}
                      onClick={() => handleReview(technician.id, "APPROVED")}
                    >
                      {reviewingId === technician.id && reviewAction === "APPROVED"
                        ? "Approving..."
                        : "Approve"}
                    </Button>
                    {rejectingId === technician.id ? (
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={reviewingId !== null}
                        onClick={() => handleReview(technician.id, "REJECTED")}
                      >
                        {reviewingId === technician.id && reviewAction === "REJECTED"
                          ? "Rejecting..."
                          : "Reject"}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={reviewingId !== null}
                        onClick={() => {
                          setRejectingId(technician.id);
                          setReason("");
                          setReviewError(null);
                        }}
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {!technicians.isPending && !technicians.isError ? (
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
            Page {technicians.data?.meta?.page ?? page} of{" "}
            {Math.max(technicians.data?.meta?.totalPages ?? 0, 1)}
          </p>
          <Button
            type="button"
            variant="outline"
            disabled={
              page >= Math.max(technicians.data?.meta?.totalPages ?? 0, 1)
            }
            onClick={() => setListQuery({ page: page + 1 })}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
