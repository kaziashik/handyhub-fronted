export const themeStorageKey = "handyhub-theme";

export type ThemeMode = "light" | "dark";

export function readStoredTheme(): ThemeMode {
  try {
    return localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Private browsing can block storage. The class still updates for this visit.
  }
}
