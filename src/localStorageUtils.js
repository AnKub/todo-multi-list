export const getTodoLists = () => {
  try {
    const lists = JSON.parse(localStorage.getItem("todoLists")) || [];
    return lists;
  } catch (error) {
    console.error("Failed to parse todo lists from localStorage:", error);
    return [];
  }
};

export const saveTodoLists = (todoLists) => {
  try {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  } catch (error) {
    console.error("Failed to save todo lists to localStorage:", error);
  }
};

export const saveTodoListTasks = (listId, updatedTasks) => {
  const todoLists = getTodoLists();
  const updatedTodoLists = todoLists.map((list) =>
    list.id === Number(listId) ? { ...list, tasks: updatedTasks } : list
  );
  saveTodoLists(updatedTodoLists);
};

export const getTodoListById = (listId) => {
  const todoLists = getTodoLists();
  return todoLists.find((list) => list.id === Number(listId));
};
