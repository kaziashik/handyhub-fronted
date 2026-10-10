"use client";

import { Toaster } from "@/components/ui/toaster";
import { useMe } from "@/hooks/use-me";
import { applyTheme, readStoredTheme } from "@/lib/theme";
import { ReactNode, useLayoutEffect } from "react";
import QueryProvider from "./query.provider";

function LoadCurrentUser() {
  useMe();
  return null;
}

function ThemeSync() {
  useLayoutEffect(() => {
    applyTheme(readStoredTheme());
  }, []);
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeSync />
      <LoadCurrentUser />
      {children}
      <Toaster />
    </QueryProvider>
  );
}
