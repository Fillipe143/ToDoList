import { ApiResponse, makeResponse } from "../types/ApiResponse";

import TaskRepository from "./TaskRepository";
import { Task } from "../types/Task";

import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "../data/");

export default class LocalTaskRepository implements TaskRepository {
    async readAllTasks(url: string): Promise<Task[]> {
        const filepath = getFilepath(url);
        if (!fs.existsSync(filepath)) return [];

        const rawTasks = fs.readFileSync(filepath, "utf8");
        return JSON.parse(rawTasks);
    }

    async createNewTask(url: string, task: Task): Promise<ApiResponse> {
        const filepath = getFilepath(url);
        const tasks = await this.readAllTasks(url);

        if (getTaskIndex(task.id, tasks) !== -1) return makeResponse(409, "Already exists a task with this id.");

        tasks.push(task);
        fs.writeFileSync(filepath, JSON.stringify(tasks), "utf8");
        return makeResponse(200);
    }

    async updateTaskData(url: string, task: Task): Promise<ApiResponse> {
        const filepath = getFilepath(url);
        const tasks = await this.readAllTasks(url);

        const taskIndex = getTaskIndex(task.id, tasks);
        if (taskIndex === -1) return makeResponse(404, "No task was found with this id.");
    
        tasks[taskIndex] = task;
        fs.writeFileSync(filepath, JSON.stringify(tasks), "utf8");
        return makeResponse(200);
    }

    async deleteTaskData(url: string, taskId: string): Promise<ApiResponse> {
        const filepath = getFilepath(url);
        const tasks = await this.readAllTasks(url);

        const taskIndex = getTaskIndex(taskId, tasks);
        if (taskIndex === -1) return makeResponse(404, "No task was found with this id.");

        tasks.splice(taskIndex, 1);
        fs.writeFileSync(filepath, JSON.stringify(tasks), "utf8");
        return makeResponse(200);
    }
}

function getFilepath(url: string): string {
    return path.join(dataPath, `${encodeURIComponent(url)}.json`);
}

function getTaskIndex(id: string, tasks: Task[]): number {
    return tasks.findIndex((task) => task.id === id);
}