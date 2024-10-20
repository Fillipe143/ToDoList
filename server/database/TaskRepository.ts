import { ApiResponse } from "../types/ApiResponse";
import { Task } from "../types/Task";

export default interface TaskRepository {
    readAllTasks(url: string): Promise<Task[]>;
    createNewTask(url: string, task: Task): Promise<ApiResponse>;
    updateTaskData(url: string, task: Task): Promise<ApiResponse>;
    deleteTaskData(url: string, taskId: string): Promise<ApiResponse>;
}