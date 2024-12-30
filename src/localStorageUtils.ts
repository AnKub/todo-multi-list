import { TodoList } from "./types";

// Завантаження списків
export const getTodoLists = (): TodoList[] => {
  try {
    const lists = JSON.parse(localStorage.getItem("todoLists") || "[]") as TodoList[];
    return lists;
  } catch (error) {
    console.error("Failed to parse todo lists from localStorage:", error);
    return [];
  }
};

// Збереження списків
export const saveTodoLists = (todoLists: TodoList[]): void => {
  try {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  } catch (error) {
    console.error("Failed to save todo lists to localStorage:", error);
  }
};

// Збереження завдань у конкретному списку
export const saveTodoListTasks = (listId: number, updatedTasks: TodoList["tasks"]): void => {
  const todoLists = getTodoLists();
  const updatedTodoLists = todoLists.map((list) =>
    list.id === listId ? { ...list, tasks: updatedTasks } : list
  );
  saveTodoLists(updatedTodoLists);
};

// Завантаження списку за його ID
export const getTodoListById = (listId: number): TodoList | undefined => {
  const todoLists = getTodoLists();
  return todoLists.find((list) => list.id === listId);
};