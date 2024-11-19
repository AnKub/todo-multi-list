import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";

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
    <div>
      <button onClick={() => navigate("/todos")}>Back to Lists</button>
      <h2>To-Do List</h2>
      <div>
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
