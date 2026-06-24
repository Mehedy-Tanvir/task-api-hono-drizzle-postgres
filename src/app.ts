import type { AppBindings } from "./types";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound } from "./helpers/not-found";
import { onError } from "./helpers/on-error";
import myLogger from "./middlewares/pino-logger";

export function createRouter() {
  return new OpenAPIHono<AppBindings>();
}

export function createApp() {
  const app = createRouter();
  app.use(myLogger());
  app.notFound(notFound);
  app.onError((err, c) => onError(err, c));

  return app;
}
