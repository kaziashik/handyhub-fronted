import { ofetch } from "ofetch";

const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export function apiUrl(path: string) {
  const onVercelSite =
    typeof window !== "undefined" &&
    window.location.hostname.endsWith(".vercel.app");
  const root = onVercelSite || !configured ? "" : configured;
  return `${root}/api/v1${path}`;
}

export const api = ofetch.create({
  credentials: "include",
  onRequest({ options }) {
    const onVercelSite =
      typeof window !== "undefined" &&
      window.location.hostname.endsWith(".vercel.app");
    const root = onVercelSite || !configured ? "" : configured;
    options.baseURL = `${root}/api/v1`;
  },
});
