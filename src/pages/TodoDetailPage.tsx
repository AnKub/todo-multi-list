import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TodoList, Task } from "../types"; 

const TodoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [list, setList] = useState<TodoList | null>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState<string>("");

  // Завантажуємо список задач з localStorage при зміні id
  useEffect(() => {
    const storedLists: TodoList[] = JSON.parse(localStorage.getItem("todoLists") || "[]");
    const foundList = storedLists.find((list) => list.id === Number(id));
    setList(foundList || null);
  }, [id]);

  // Додавання нової задачі
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    if (list) {
      const updatedList: TodoList = {
        ...list,
        tasks: [...list.tasks, { id: Date.now(), title: newTask, completed: false }],
      };
      updateLocalStorage(updatedList);
      setNewTask("");
    }
  };

  // Видалення задачі
  const handleDeleteTask = (taskId: number) => {
    if (list) {
      const updatedList: TodoList = {
        ...list,
        tasks: list.tasks.filter((task) => task.id !== taskId),
      };
      updateLocalStorage(updatedList);
    }
  };

  // Початок редагування задачі
  const handleEditTask = (task: Task) => {
    setEditingTask(task.id);
    setEditTaskText(task.title);
  };

  // Збереження змін у задачі
  const handleSaveEdit = (taskId: number) => {
    if (list) {
      const updatedList: TodoList = {
        ...list,
        tasks: list.tasks.map((task) =>
          task.id === taskId ? { ...task, title: editTaskText } : task
        ),
      };
      updateLocalStorage(updatedList);
      setEditingTask(null);
      setEditTaskText("");
    }
  };

  // Оновлення списку в localStorage
  const updateLocalStorage = (updatedList: TodoList) => {
    const allLists: TodoList[] = JSON.parse(localStorage.getItem("todoLists") || "[]");
    const updatedLists = allLists.map((item) =>
      item.id === updatedList.id ? updatedList : item
    );
    localStorage.setItem("todoLists", JSON.stringify(updatedLists));
    setList(updatedList);
  };

  if (!list) return <p>Loading...</p>;

  return (
    <div className="todo-detail-page">
      <div className="todo-detail-header">
        <h1>{list.name}</h1>
        <button onClick={() => navigate("/todos")}>Back to Lists</button>
      </div>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {list.tasks.map((task) => (
          <li
            key={task.id}
            className="todo-detail-task"
            onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
          >
            {editingTask === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoDetailPage;
