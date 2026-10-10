"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import Link from "next/link";
import { useEffect } from "react";

export function PaymentResult({
  title,
  detail,
  tone,
}: {
  title: string;
  detail: string;
  tone: "success" | "error";
}) {
  useEffect(() => {
    if (tone === "success") toast.success(title);
    else toast.error(title);
  }, [title, tone]);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center gap-4 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
      <Button
        className="w-fit"
        render={<Link href="/customer/appointments">View appointments</Link>}
        nativeButton={false}
      />
    </div>
  );
}
