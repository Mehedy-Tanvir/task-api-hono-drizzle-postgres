import type { AppHandler } from "../../types";
import type { AllTasks, GetSingle } from "./task.routes";
import db from "../../db";

export const getAll: AppHandler<AllTasks> = async (c) => {
  const tasks = await db.query.taskTable.findMany();
  return c.json(tasks, 200);
};

export const getOne: AppHandler<GetSingle> = async (c) => {
  const { id } = c.req.valid("param");
  const task = await db.query.taskTable.findFirst({
    where: (taskTable, { eq }) => eq(taskTable.id, id),
  });

  if (!task) {
    return c.json({ status: "Failed", message: "Task not found" }, 404);
  }

  return c.json(task, 200);
};
