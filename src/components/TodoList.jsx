// src/components/TodoList.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import { getTodoListById, saveTodoListTasks } from "../utils/localStorageUtils";
import "../styles/main.scss";

const TodoList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Загружаем задачи из списка при монтировании
  useEffect(() => {
    const currentList = getTodoListById(id);
    if (currentList) {
      setTasks(currentList.tasks || []);
    }
  }, [id]);

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

  return (
    <div className="todo-list">
      <h2 className="todo-list-title">To-Do List</h2>
      <div className="todo-list-input-container">
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="todo-list-input"
        />
        <button onClick={addTask} className="todo-list-button">
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
          />
        ))}
      </div>
      <div className="todo-list-actions">
        <button onClick={() => navigate("/todos")} className="todo-list-back-button">
          Back to Lists
        </button>
        <button onClick={saveTasks} className="todo-list-save-button">
          Save Tasks
        </button>
      </div>
    </div>
  );
};

export default TodoList;
