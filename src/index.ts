import { getRequestListener, serve } from "@hono/node-server";
import { createApp } from "./app";
import env from "./env";
import { configureApiDoc } from "./middlewares/configure-api-doc";
import indexRoute from "./routes/index.route";
import task from "./routes/task/task.index";

console.log("[INDEX] Starting src/index.ts import...");

let app: ReturnType<typeof createApp>;
let requestListener: ReturnType<typeof getRequestListener>;

try {
  console.log("[INDEX] Creating app...");
  app = createApp();
  console.log("[INDEX] App created OK");

  console.log("[INDEX] Configuring API docs...");
  configureApiDoc(app);
  console.log("[INDEX] API docs configured OK");

  console.log("[INDEX] Registering routes...");
  const routes = [indexRoute, task];
  routes.forEach((route, i) => {
    app.route("/", route);
    console.log(`[INDEX] Route ${i} registered OK`);
  });
  console.log("[INDEX] All routes registered OK");

  console.log("[INDEX] Building request listener...");
  requestListener = getRequestListener(app.fetch);
  console.log("[INDEX] Request listener built OK");
} catch (e: any) {
  console.error("[INDEX] FATAL ERROR during initialization:", e.stack || e.message);
  throw e;
}

export default requestListener;

// Local development only — start actual server
if (env.NODE_ENV !== "production" && !process.env.VERCEL) {
  console.log("[INDEX] Starting local dev server...");
  serve({
    fetch: app.fetch,
    port: env.PORT,
  }, (info) => {
    console.warn(`[INDEX] Server is running on http://localhost:${info.port}`);
  });
} else {
  console.log("[INDEX] Vercel/Production mode — skipping serve()");
}
