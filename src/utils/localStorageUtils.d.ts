import { TodoList, Task } from "../types";

export declare function getTodoLists(): TodoList[];
export declare function saveTodoLists(todoLists: TodoList[]): void;
export declare function getTodoListById(listId: number): TodoList | undefined;
export declare function saveTodoListTasks(listId: number, updatedTasks: Task[]): void;
