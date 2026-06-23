import type { Context } from "hono";

export function notFound(c: Context) {
  return c.json({
    status: "OK",
    message: "Server Running",
  });
}
