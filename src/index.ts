import { getRequestListener, serve } from "@hono/node-server";
import { createApp } from "./app";
import env from "./env";
import { configureApiDoc } from "./middlewares/configure-api-doc";
import indexRoute from "./routes/index.route";
import task from "./routes/task/task.index";



let app: ReturnType<typeof createApp>;
let requestListener: ReturnType<typeof getRequestListener>;

try {

  app = createApp();


  configureApiDoc(app);


  const routes = [indexRoute, task];
  routes.forEach((route, i) => {
    app.route("/", route);
  });
  requestListener = getRequestListener(app.fetch);
} catch (e: any) {
  console.error("[INDEX] FATAL ERROR during initialization:", e.stack || e.message);
  throw e;
}

export default requestListener;

// Local development only — start actual server
if (env.NODE_ENV !== "production" && !process.env.VERCEL) {
  serve({
    fetch: app.fetch,
    port: env.PORT,
  }, (info) => {
    console.warn(`[INDEX] Server is running on http://localhost:${info.port}`);
  });
} else {
  console.warn("[INDEX] Vercel/Production mode — skipping serve()");
}
