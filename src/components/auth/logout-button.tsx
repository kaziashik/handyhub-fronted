"use client";

import { logout } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { meQueryKey } from "@/hooks/use-me";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      await logout();
      queryClient.setQueryData(meQueryKey, null);
      router.replace("/");
    } catch {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={pending}
      onClick={handleLogout}
    >
      {pending ? "Logging out..." : "Logout"}
    </Button>
  );
}
