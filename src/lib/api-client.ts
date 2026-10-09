import { ofetch } from "ofetch";

const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

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
