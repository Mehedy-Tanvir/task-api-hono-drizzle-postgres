import { getRequestListener, serve } from "@hono/node-server";
import { createApp } from "./app";
import env from "./env";
import { configureApiDoc } from "./middlewares/configure-api-doc";
import indexRoute from "./routes/index.route";
import task from "./routes/task/task.index";

const app = createApp();
configureApiDoc(app);

const routes = [indexRoute, task];
routes.forEach(route => app.route("/", route));

// Export handler for Vercel serverless (Node.js runtime)
export default getRequestListener(app.fetch);

// Local development only — start actual server
if (env.NODE_ENV !== "production" && !process.env.VERCEL) {
  serve({
    fetch: app.fetch,
    port: env.PORT,
  }, (info) => {
    console.warn(`Server is running on http://localhost:${info.port}`);
  });
}
