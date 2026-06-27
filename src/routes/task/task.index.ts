import { createRouter } from "../../app";
import * as handler from "./task.handler";
import * as routes from "./task.routes";

const task = createRouter().openapi(routes.allTasks, handler.getAll);

export default task;
