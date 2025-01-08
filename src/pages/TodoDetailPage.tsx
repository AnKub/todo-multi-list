import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TodoList, Task } from "../types";
import "../styles/main.scss";
import TaskItem from "../components/TaskItem";

const TodoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [list, setList] = useState<TodoList | null>(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedLists: TodoList[] = JSON.parse(localStorage.getItem("todoLists") || "[]");
    const foundList = storedLists.find((list) => list.id === Number(id));
    setList(foundList || null);
  }, [id]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newTaskObj: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      dueDate: null,
    };

    if (list) {
      const updatedList: TodoList = {
        ...list,
        tasks: [...list.tasks, newTaskObj],
      };
      updateLocalStorage(updatedList);
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId: number) => {
    if (list) {
      const updatedList = {
        ...list,
        tasks: list.tasks.filter((task) => task.id !== taskId),
      };
      updateLocalStorage(updatedList);
    }
  };

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
      <h1>{list.name}</h1>
      <button onClick={() => navigate("/todos")}>Back to Lists</button>

      <div className="add-task-section">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {list.tasks.map((task) => (
          <li key={task.id} className="task-item">
            <TaskItem
              task={task}
              onDelete={handleDeleteTask}
              onToggle={(id) => console.log("Toggle task", id)}
              onUpdate={(id, title, date) =>
                console.log(`Update task ${id}: ${title}, Due: ${date?.toLocaleDateString()}`)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoDetailPage;
