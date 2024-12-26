declare module 'src/utils/localStoregeUtils' {
  export function getTodoLists(): any[];
  export function saveTodoLists(lists: any[]): void;
  export function getTodoListById(id: string): any | undefined;
  export function saveTodoListTasks(id: string, tasks: any[]): void;
}
