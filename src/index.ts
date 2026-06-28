import { serve } from "@hono/node-server";
import { createApp } from "./app";
import env from "./env";
import { configureApiDoc } from "./middlewares/configure-api-doc";
import indexRoute from "./routes/index.route";
import task from "./routes/task/task.index";

const app = createApp();
configureApiDoc(app);

const routes = [indexRoute, task];
routes.forEach(route => app.route("/", route));

// Local development only
if (env.NODE_ENV !== "production") {
  serve({
    fetch: app.fetch,
    port: env.PORT,
  }, (info) => {
    console.warn(`Server is running on http://localhost:${info.port}`);
  });
}

// Vercel needs this
export default app;
