import TaskRepository from "../database/TaskRepository";
import { ApiResponse, makeResponse } from "../types/ApiResponse";

export default async function deleteTask(url: string, data: Object, db: TaskRepository): Promise<ApiResponse> {
    if (data === undefined) return makeResponse(400, "Missing 'data' field.");

    if (!("id" in data)) return makeResponse(400, "Missing 'id' field.");
    if (typeof(data.id) !== "string") return makeResponse(400, "'id' field must be of type string.");

    return await db.deleteTaskData(url, data.id);
}