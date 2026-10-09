"use client";

import { getPublicTechnician } from "@/api/technician.api";
import {
  formatFee,
  TechnicianCard,
  TechnicianPortrait,
} from "@/components/modules/technicians/technician-card";
import { apiErrorMessage } from "@/lib/api-error";
import { useQuery } from "@tanstack/react-query";

export function TechnicianDetail({ techinicianId }: { techinicianId: string }) {
  const technician = useQuery({
    queryKey: ["public-technician", techinicianId],
    queryFn: () => getPublicTechnician(techinicianId),
  });

  if (technician.isPending) {
    return <div className="h-96 animate-pulse rounded-lg border bg-muted" />;
  }

  if (technician.isError) {
    return (
      <p className="text-sm text-destructive">
        {apiErrorMessage(technician.error, "Could not load this technician")}
      </p>
    );
  }

  const profile = technician.data.data.technician;
  const related = technician.data.data.related;
  const facts = [
    ["Specialty", profile.specialization],
    ["Experience", `${profile.experienceYears} years`],
    ["Fee", formatFee(profile.consultationFee)],
    ["Qualifications", profile.qualifications],
    ["Area", profile.address || "Not listed"],
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-6 md:grid-cols-[16rem_1fr]">
        <div className="overflow-hidden rounded-lg border">
          <TechnicianPortrait
            name={profile.name}
            imageUrl={profile.user.imageUrl}
            specialization={profile.specialization}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            {profile.bio || "This technician has not added a biography yet."}
          </p>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        {facts.map(([label, value]) => (
          <article key={label} className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-sm">{value}</p>
          </article>
        ))}
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Related technicians</h2>
        {related.length ? (
          <ul className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.id}>
                <TechnicianCard technician={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No other approved technician shares this specialty.
          </p>
        )}
      </section>
    </div>
  );
}
