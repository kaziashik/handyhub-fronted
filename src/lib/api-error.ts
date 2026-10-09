import { FetchError } from "ofetch";

export function apiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof FetchError) {
    const body = error.data;
    if (typeof body === "string" && body.trim()) return body;
    if (body && typeof body === "object" && "message" in body) {
      const message = body.message;
      if (typeof message === "string" && message.trim()) return message;
    }
  }
  return fallback;
}
