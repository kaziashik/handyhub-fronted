import { ofetch } from "ofetch";

const root = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export const api = ofetch.create({
  baseURL: `${root}/api/v1`,
  credentials: "include",
});
