import TaskRepository from "../database/TaskRepository";
import { ApiResponse, makeResponse } from "../types/ApiResponse";
import createTask from "./createTask"
import deleteTask from "./deleteTask";
import readTasks from "./readTasks";
import updateTask from "./updateTask";

export default async function forwardToRoute(action: string, url: string, data: Object, db: TaskRepository): Promise<ApiResponse> {
    switch (action) {
        case "create": return await createTask(url, data, db);
        case "read": return await readTasks(url, db);
        case "update": return await updateTask(url, data, db);
        case "delete": return await deleteTask(url, data, db);
        default: return makeResponse(400, "Invalid action type.");
    }
}