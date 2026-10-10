"use client";

import { Button } from "@/components/ui/button";
import { applyTheme, readStoredTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useLayoutEffect(() => {
    setDark(readStoredTheme() === "dark");
  }, []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        const next = dark ? "light" : "dark";
        applyTheme(next);
        setDark(next === "dark");
      }}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
