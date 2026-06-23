import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound } from "./helpers/not-found";

export function createApp() {
  const app = new OpenAPIHono();
  app.notFound(notFound);

  return app;
}
