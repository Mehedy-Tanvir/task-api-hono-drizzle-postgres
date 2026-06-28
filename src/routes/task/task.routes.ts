import { createRoute } from "@hono/zod-openapi";
import * as z from "zod";
import { insertSchema, selectTaskSchema, updateSchema } from "../../db/schema";
import * as HttpsStatus from "../../helpers/https-status";
import { jsonContent } from "../../helpers/json-content";
import { jsonRequiredContent } from "../../helpers/json-required-content";
import { BadRequestSchema, IdParams, NotFoundSchema } from "../../helpers/schema";

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

export const createTask = createRoute({
  tags,
  method: "post",
  path: "/task",
  request: {
    body: jsonRequiredContent(insertSchema, "The task created"),
  },

  responses: {
    [HttpsStatus.CREATED]: jsonContent(selectTaskSchema, "The task created"),

  },
});

export const updateTask = createRoute({
  tags,
  method: "put",
  path: "/task/{id}",
  request: {
    params: IdParams,
    body: jsonRequiredContent(updateSchema, "The task updated"),
  },

  responses: {
    [HttpsStatus.OK]: jsonContent(selectTaskSchema, "The task updated successfully"),
    [HttpsStatus.NOT_FOUND]: jsonContent(NotFoundSchema, "Task not found"),
    [HttpsStatus.BAD_REQUEST]: jsonContent(BadRequestSchema, "The task update failed"),

  },
});
export const deleteTask = createRoute({
  tags,
  method: "delete",
  path: "/task/{id}",
  request: { params: IdParams,
  },

  responses: {
    [HttpsStatus.OK]: jsonContent(z.object({
      status: z.string(),
      id: z.string().uuid(),
    }), "The task deleted successfully"),
    [HttpsStatus.NOT_FOUND]: jsonContent(NotFoundSchema, "Task not found"),

  },
});
export type AllTasks = typeof allTasks;
export type GetSingle = typeof getSingle;
export type CreateTask = typeof createTask;
export type UpdateTask = typeof updateTask;
export type DeleteTask = typeof deleteTask;
