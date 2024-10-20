import TaskRepository from "../database/TaskRepository";
import { ApiResponse, makeResponse } from "../types/ApiResponse";

export default async function readTasks(url: string, db: TaskRepository): Promise<ApiResponse> {
    const tasks = await db.readAllTasks(url);
    return makeResponse(200, tasks);
}