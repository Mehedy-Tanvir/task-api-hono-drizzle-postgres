import { createRouter } from "../../app";
import * as handler from "./task.handler";
import * as routes from "./task.routes";

const task = createRouter()
  .openapi(routes.allTasks, handler.getAll)
  .openapi(routes.getSingle, handler.getOne)
  .openapi(routes.createTask, handler.createTask)
  .openapi(routes.updateTask, handler.updateTask)
  .openapi(routes.deleteTask, handler.deleteTask);

export default task;
