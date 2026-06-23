import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound } from "./helpers/not-found";
import { onError } from "./helpers/on-error";

export function createApp() {
  const app = new OpenAPIHono();
  app.notFound(notFound);
  app.onError((err, c) => onError(err, c));

  return app;
}
