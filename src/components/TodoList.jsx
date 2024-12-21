import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import { getTodoListById, saveTodoListTasks } from "../utils/localStorageUtils";
import "../styles/main.scss";

const TodoList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [listName, setListName] = useState(""); 
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Завантажуємо список і його назву
  useEffect(() => {
    const currentList = getTodoListById(id);
    if (currentList) {
      setListName(currentList.name || "Unnamed List"); // Встановлюємо назву
      setTasks(currentList.tasks || []); 
    } else {
      alert("List not found! Returning to grid.");
      navigate("/todos");
    }
  }, [id, navigate]);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = { id: Date.now(), title: newTaskTitle, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
    } else {
      alert("Task title is required");
    }
  };

  const saveTasks = () => {
    saveTodoListTasks(id, tasks);
    alert("Tasks saved successfully!");
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (taskId, newTitle) => {
    if (typeof newTitle !== "string") {
      console.error("Invalid newTitle:", newTitle);
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle.trim() } : task
      )
    );
  };

  return (
    <div className="todo-list">         
      <h2 className="todo-list-title">{listName}</h2> {/* Відображаємо назву списку */}
        <div className="todo-list-input-container">
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="todo-list-input"
        />
        <button onClick={addTask} className="todo-grid-button">
          Add Task
        </button>      
      </div>
      <div className="todo-items-container">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onUpdate={(taskId, newTitle) => updateTask(taskId, newTitle)}
          />
        ))}
      </div>
      <div className="todo-list-actions">      
        <button onClick={saveTasks} className="todo-grid-button">
          Save
        </button>
        <button onClick={() => navigate("/todos")} className="todo-grid-button button-back">
          Back
        </button>
      </div>
    </div>
  );
};

export default TodoList;
