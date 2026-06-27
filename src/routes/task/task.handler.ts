import type { AppHandler } from "../../types";
import type { AllTasks, GetSingle } from "./task.routes";
import db from "../../db";
import { taskTable } from "../../db/schema";

export const getAll: AppHandler<AllTasks> = async (c) => {
  const tasks = await db.query.taskTable.findMany();
  return c.json(tasks, 200);
};

export const getOne: AppHandler<GetSingle> = async (c) => {
  const { id } = c.req.valid("param");
  const task = await db.query.taskTable.findFirst({
    where: (taskTable, { eq }) => eq(taskTable.id, id),
  });

  return c.json(task, 200);
};
