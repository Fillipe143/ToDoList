import { ApiResponse, makeResponse } from "../types/ApiResponse";

import TaskRepository from "./TaskRepository";
import { Task } from "../types/Task";

import mysql, { Connection } from "mysql2/promise";

export default class MySQLTaskRepository implements TaskRepository {
    private conn?: Connection;

    constructor() {
        (async () => {
            this.conn = await mysql.createConnection({
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASS
            });

            this.conn.execute(`CREATE DATABASE IF NOT EXISTS todolist;`);
            this.conn.query("use todolist;")

            this.conn.execute(`CREATE TABLE IF NOT EXISTS tasks (
                id VARCHAR(25) NOT NULL PRIMARY KEY,
                url TEXT NOT NULL,
                description TEXT NOT NULL,
                finished BOOLEAN NOT NULL 
            );`);
        })().catch(() => {
            console.log("- Não foi possivel se conectar ao MySQL.");
            console.log("\t1. Verifique se o MySql esta rodando na maquina;");
            console.log("\t2. Verifique se as credenciais do MySql no arquivo '.env' estão corretas;");
            console.log("\t3. Alterne para o banco de dados local no arquivo '.env';");
        });
    }

    async readAllTasks(url: string): Promise<Task[]> {
        if (this.conn === undefined) return [];

        const res = await this.conn.query(`SELECT id, description, finished FROM tasks WHERE url="${url}";`);
        return res[0] as Task[];
    }

    async createNewTask(url: string, task: Task): Promise<ApiResponse> {
        if (this.conn === undefined) return makeResponse(500, "Unable to connect to database");

        try {
            await this.conn.query(`INSERT INTO tasks (id, url, description, finished)
                VALUES ("${task.id}", "${url}", "${task.description}", ${task.finished});`);
        } catch (e) {
            return makeResponse(500, e);
        }

        return makeResponse(200);
    }

    async updateTaskData(url: string, task: Task): Promise<ApiResponse> {
        if (this.conn === undefined) return makeResponse(500, "Unable to connect to database");

        try {
            await this.conn.query(`UPDATE tasks SET 
                description = "${task.description}",
                finished = ${Number(task.finished)}
                WHERE id = "${task.id}" AND url = "${url}";`);
        } catch (e) {
            return makeResponse(500, e);
        }

        return makeResponse(200);
    }

    async deleteTaskData(url: string, taskId: string): Promise<ApiResponse> {
        if (this.conn === undefined) return makeResponse(500, "Unable to connect to database");

        try {
            await this.conn.query(`DELETE FROM tasks WHERE id = "${taskId}" AND url = "${url}"`);
        } catch (e) {
            return makeResponse(500, e);
        }

        return makeResponse(200);
    }
}