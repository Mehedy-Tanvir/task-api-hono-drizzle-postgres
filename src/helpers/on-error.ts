import type { Context } from "hono";

export function onError(error: Error, c: Context) {
  console.error("[ON_ERROR] Request error:", error.message, "\nStack:", error.stack);
  return c.json({
    status: "Failed",
    error: JSON.stringify(error.stack),
  });
}
