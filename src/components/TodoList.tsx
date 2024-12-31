import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import { getTodoListById, saveTodoListTasks } from "../localStorageUtils";
import { Task } from "../types";
import "../styles/main.scss";
import '../styles/TodoList.scss';

const TodoList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [listName, setListName] = useState<string>("Unnamed List");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  useEffect(() => {
    const list = getTodoListById(Number(id));
    if (list) {
      setListName(list.name);
      setTasks(list.tasks);
    } else {
      alert("List not found!");
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
    saveTodoListTasks(Number(id), tasks);
    alert("Tasks saved successfully!");
  };

  const deleteTask = (taskId: number) => setTasks((prev) => prev.filter((task) => task.id !== taskId));

  const toggleTask = (taskId: number) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

  const updateTaskTitle = (taskId: number, newTitle: string) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, title: newTitle } : task))
    );

  return (
    <div className="todo-list">
      <h2 className="todo-list-title">{listName}</h2>
      <input
       className="todo-list-input"
        type="text"
        placeholder="Task title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button className="todo-list-button" onClick={addTask}>Add Task</button>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onUpdate={updateTaskTitle}
        />
      ))}
      <button className="todo-list-button-save" onClick={saveTasks}>Save Tasks</button>
      <button className="todo-list-button" onClick={() => navigate("/todos")}>Back</button>
    </div>
  );
};

export default TodoList;
