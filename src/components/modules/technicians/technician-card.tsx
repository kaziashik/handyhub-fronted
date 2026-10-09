import { tradePhoto } from "@/lib/trade-photo";
import type { PublicTechnician } from "@/types";
import { Banknote, Briefcase, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export function formatFee(fee: PublicTechnician["consultationFee"]) {
  if (fee === null || fee === "") return "Fee not set";
  const amount = Number(fee);
  if (Number.isNaN(amount)) return String(fee);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function TechnicianPortrait({
  name,
  imageUrl,
  specialization,
}: {
  name: string;
  imageUrl?: string;
  specialization?: string | null;
}) {
  const src = imageUrl?.trim() ? imageUrl : tradePhoto(specialization);

  return (
    <img
      alt={`${name}${specialization ? `, ${specialization}` : ""}`}
      src={src}
      className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
}

export function TechnicianCard({ technician }: { technician: PublicTechnician }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <TechnicianPortrait
        name={technician.name}
        imageUrl={technician.user.imageUrl}
        specialization={technician.specialization}
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="font-medium">{technician.name}</h2>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {technician.bio || technician.qualifications}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Briefcase className="size-4 text-primary" aria-hidden />
          {technician.specialization}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Clock className="size-4 text-primary" aria-hidden />
          {technician.experienceYears} years
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Banknote className="size-4 text-primary" aria-hidden />
          {formatFee(technician.consultationFee)}
        </p>
        {technician.address ? (
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-primary" aria-hidden />
            {technician.address}
          </p>
        ) : null}
        <Link
          href={`/technicians/${technician.id}`}
          className="mt-auto inline-flex h-8 items-center justify-center rounded-lg border px-2.5 text-sm transition hover:bg-muted"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
