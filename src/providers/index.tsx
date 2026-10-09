"use client";

import { useMe } from "@/hooks/use-me";
import { ReactNode } from "react";
import QueryProvider from "./query.provider";

function LoadCurrentUser() {
  useMe();
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <LoadCurrentUser />
      {children}
    </QueryProvider>
  );
}
