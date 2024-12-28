import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TodoList } from "../types";
import "../styles/main.scss";

const TodoPage: React.FC = () => {
  // Встановлюємо типи для стану
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    const storedLists = localStorage.getItem("todoLists");
    const parsedLists: TodoList[] = storedLists ? JSON.parse(storedLists) : [];
    setTodoLists(parsedLists);
  }, []);

  const handleDeleteList = (id: number): void => {
    const updatedLists = todoLists.filter((list) => list.id !== id);
    localStorage.setItem("todoLists", JSON.stringify(updatedLists));
    setTodoLists(updatedLists);
  };

  return (
    <div className="todo-page">
      <h1>To-Do</h1>
      <Link to="/todos/create">
        <button className="todo-create-button">Create New List</button>
      </Link>
      <div className="todo-list-container">
        {todoLists.length === 0 ? (
          <p>No To-Do available.</p>
        ) : (
          todoLists.map((list) => (
            <div key={list.id} className="todo-list-item">
              <h3>{list.name}</h3>
              <Link to={`/todos/${list.id}`} className="todo-list-link">
                View Tasks
              </Link>
              <button
                onClick={() => handleDeleteList(list.id)}
                className="todo-delete-button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoPage;
