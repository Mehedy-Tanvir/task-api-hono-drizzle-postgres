import type { AppHandler } from "../../types";
import type { AllTasks, CreateTask, DeleteTask, GetSingle, UpdateTask } from "./task.routes";
import { eq } from "drizzle-orm";
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

  if (!task) {
    return c.json({ status: "Failed", message: "Task not found" }, 404);
  }

  return c.json(task, 200);
};

export const createTask: AppHandler<CreateTask> = async (c) => {
  const task = c.req.valid("json");
  const [createdTask] = await db.insert(taskTable).values(task).returning();

  return c.json(createdTask, 201);
};

export const updateTask: AppHandler<UpdateTask> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  if (Object.values(data).length === 0) {
    return c.json({ status: "Failed", message: "name or done property required" }, 400);
  }

  const task = await db.query.taskTable.findFirst({
    where: (taskTable, { eq }) => eq(taskTable.id, id),
  });

  if (!task) {
    return c.json({ status: "Failed", message: "Task not found" }, 404);
  }

  const [updatedTask] = await db.update(taskTable).set(data).where(eq(taskTable.id, id)).returning();

  return c.json(updatedTask, 200);
};

export const deleteTask: AppHandler<DeleteTask> = async (c) => {
  const { id } = c.req.valid("param");

  const task = await db.query.taskTable.findFirst({
    where: (taskTable, { eq }) => eq(taskTable.id, id),
  });

  if (!task) {
    return c.json({ status: "Failed", message: "Task not found" }, 404);
  }

  const [deletedTask] = await db.delete(taskTable).where(eq(taskTable.id, id)).returning();

  return c.json({ id: deletedTask.id, status: "Success" }, 200);
};
