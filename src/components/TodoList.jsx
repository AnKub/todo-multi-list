import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import TaskItem from "./TaskItem";
import './main.scss';

const TodoList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const currentList = storedLists.find((list) => list.id === Number(id));
    if (currentList) {
      setTasks(currentList.tasks);
    }
  }, [id]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const updatedLists = storedLists.map((list) => {
      if (list.id === Number(id)) {
        return { ...list, tasks };
      }
      return list;
    });
    localStorage.setItem("todoLists", JSON.stringify(updatedLists));
  }, [tasks, id]);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = { id: Date.now(), title: newTaskTitle, completed: false };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } else {
      alert("Task title is required");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-list">
      <button onClick={() => navigate("/todos")} className="todo-list-back-button">Back to Lists</button>
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
          <div key={task.id} className="todo-item">
            <Link to={`/todo/${task.id}`} className="todo-item-link">
              <TaskItem
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
