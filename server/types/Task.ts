export type Task = {
    id: string,
    description: string,
    finished: boolean
};

export function makeTask(id: string, description: string, finished: boolean = false): Task {
    return {id, description, finished};
}