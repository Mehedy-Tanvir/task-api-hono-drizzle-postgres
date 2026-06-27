import type { AppHandler } from "../../types";
import type { AllTasks } from "./task.routes";
import db from "../../db";

export const getAll: AppHandler<AllTasks> = async (c) => {
  const tasks = await db.query.taskTable.findMany();
  return c.json(tasks, 200);
};
