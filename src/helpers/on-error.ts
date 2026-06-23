import type { Context } from "hono";

export function onError(error: Error, c: Context) {
  return c.json({
    status: "Failed",
    error: JSON.stringify(error.stack),
  });
}
