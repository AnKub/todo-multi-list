import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const foundList = storedLists.find((list) => list.id === Number(id));
    setList(foundList);
  }, [id]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
  
    const updatedList = { ...list, tasks: [...list.tasks, { id: Date.now(), text: newTask }] };
    updateLocalStorage(updatedList);
  };
  
  const handleDeleteTask = (taskId) => {
    const updatedList = { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) };
    updateLocalStorage(updatedList);
  };
  
  const updateLocalStorage = (updatedList) => {
    const allLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const updatedLists = allLists.map((item) => (item.id === updatedList.id ? updatedList : item));
  
    localStorage.setItem("todoLists", JSON.stringify(updatedLists));
    setList(updatedList);
  };
  

  if (!list) return <p>Loading...</p>;

  return (
    <div className="todo-detail-page">
      <h1>{list.name}</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={() => navigate("/todos")}>Back to Lists</button>
      <ul>
        {list.tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoDetailPage;
