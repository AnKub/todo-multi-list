import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import { getTodoListById, saveTodoListTasks } from "../localStorageUtils";
import "../styles/main.scss";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [listName, setListName] = useState<string>(""); 
  const [newTaskTitle, setNewTaskTitle] = useState<string>(""); 

  useEffect(() => {
    const currentList = getTodoListById(id);
    if (currentList) {
      setListName(currentList.name || "Unnamed List");
      setTasks(currentList.tasks || []);
    } else {
      alert("List not found! Returning to grid.");
      navigate("/todos");
    }
  }, [id, navigate]);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = { id: Date.now(), title: newTaskTitle, completed: false };
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

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (taskId: number, newTitle: string) => {
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
      <h2 className="todo-list-title">{listName}</h2>
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
            onUpdate={updateTask}
          />
        ))}
      </div>
      <div className="todo-list-actions">
        <button onClick={saveTasks} className="save-button">
          Save Tasks
        </button>
        <button onClick={() => navigate("/todos")}>Back to Lists</button>
      </div>
    </div>
  );
};

export default TodoList;
