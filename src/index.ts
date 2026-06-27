import { serve } from "@hono/node-server";
import { createApp } from "./app";
import env from "./env";
import { configureApiDoc } from "./middlewares/configure-api-doc";
import indexRoute from "./routes/index.route";

const app = createApp();
configureApiDoc(app);
const routes = [indexRoute];

routes.forEach(route => app.route("/", route));

serve({
  fetch: app.fetch,
  port: env.PORT,
}, (info) => {
  console.warn(`Server is running on http://localhost:${info.port}`);
});
