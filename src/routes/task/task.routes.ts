import { createRoute } from "@hono/zod-openapi";
import * as z from "zod";
import { selectTaskSchema } from "../../db/schema";
import { jsonContent } from "../../helpers/json-content";

const tags = ["Tasks"];

export const allTasks = createRoute({
  tags,
  method: "get",
  path: "/task",
  responses: {
    200: jsonContent(z.array(selectTaskSchema), "All Tasks list"),
  },
});

export type AllTasks = typeof allTasks;
