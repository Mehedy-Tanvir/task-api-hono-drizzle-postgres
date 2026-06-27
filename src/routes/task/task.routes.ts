import { createRoute } from "@hono/zod-openapi";
import * as z from "zod";
import { selectTaskSchema } from "../../db/schema";
import * as HttpsStatus from "../../helpers/https-status";
import { jsonContent } from "../../helpers/json-content";
import { IdParams, NotFoundSchema } from "../../helpers/schema";

const tags = ["Tasks"];

export const allTasks = createRoute({
  tags,
  method: "get",
  path: "/task",
  responses: {
    [HttpsStatus.OK]: jsonContent(z.array(selectTaskSchema), "All Tasks list"),
  },
});

export const getSingle = createRoute({
  tags,
  method: "get",
  path: "/task/{id}",
  request: { params: IdParams,
  },
  responses: {
    [HttpsStatus.OK]: jsonContent(selectTaskSchema, "The selected task"),
    [HttpsStatus.NOT_FOUND]: jsonContent(NotFoundSchema, "Task not found"),
  },
});
export type AllTasks = typeof allTasks;
export type GetSingle = typeof getSingle;
