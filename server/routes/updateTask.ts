import TaskRepository from "../database/TaskRepository";
import { ApiResponse, makeResponse } from "../types/ApiResponse";
import { makeTask } from "../types/Task";

export default async function updateTask(url: string, data: Object, db: TaskRepository): Promise<ApiResponse> {
    if (data === undefined) return makeResponse(400, "Missing 'data' field.");

    if (!("id" in data)) return makeResponse(400, "Missing 'id' field.");
    if (!("description" in data)) return makeResponse(400, "Missing 'description' field.");
    if (!("finished" in data)) return makeResponse(400, "Missing 'finishsed' field.")
    if (typeof(data.id) !== "string") return makeResponse(400, "'id' field must be of type string.");
    if (typeof(data.description) !== "string") return makeResponse(400, "'description' field must be of type string.");
    if (typeof(data.finished) !== "boolean") return makeResponse(400, "'finished' field must be of type boolean.");

    const task = makeTask(data.id, data.description, data.finished);
    return await db.updateTaskData(url, task);
}