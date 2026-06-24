import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "../app";

const indexRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ status: z.string(), message: z.string() }).openapi({ example: { status: "OK", message: "Index Route Worked!" } }),
        },
      },
      description: "Index Route",
    },
  },
});

const index = createRouter().openapi(indexRoute, (c) => {
  return c.json({ status: "OK", message: "Index Route Worked!" }, 200);
});

export default index;
