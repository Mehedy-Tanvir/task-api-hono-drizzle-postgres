import { serve } from "@hono/node-server";
import { createApp } from "./app";
import env from "./env";

const app = createApp();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/error", () => {
  throw new Error("Intentional error");
});

serve({
  fetch: app.fetch,
  port: env.PORT,
}, (info) => {
  console.warn(`Server is running on http://localhost:${info.port}`);
});
