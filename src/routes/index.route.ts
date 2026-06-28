import { createRoute } from "@hono/zod-openapi";
import { createRouter } from "../app";
import * as HttpsStatus from "../helpers/https-status";
import { jsonContent } from "../helpers/json-content";
import { rootRequestSchema } from "../helpers/schema";

const indexRoute = createRoute({
  tags: ["Root"],
  method: "get",
  path: "/",
  responses: {
    [HttpsStatus.OK]: jsonContent(rootRequestSchema, "The Task API Running!"),
  },
});

const index = createRouter().openapi(indexRoute, (c) => {
  return c.json({ status: "OK", message: "Index Route Worked!" }, 200);
});

export default index;
