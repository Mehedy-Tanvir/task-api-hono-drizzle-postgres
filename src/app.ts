import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { notFound } from "./helpers/not-found";
import { onError } from "./helpers/on-error";
import myLogger from "./middlewares/pino-logger";

export function createApp() {
  const app = new OpenAPIHono();
  app.use(myLogger());
  app.notFound(notFound);
  app.onError((err, c) => onError(err, c));

  return app;
}
