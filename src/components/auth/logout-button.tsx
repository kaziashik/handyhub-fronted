"use client";

import { logout } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { meQueryKey } from "@/hooks/use-me";
import { clearSessionRole } from "@/lib/session-role";
import { toast, toastError } from "@/lib/toast";
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
      clearSessionRole();
      queryClient.setQueryData(meQueryKey, null);
      toast.success("Signed out");
      router.replace("/");
    } catch (error) {
      toastError(error instanceof Error ? error.message : "Could not sign out");
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
