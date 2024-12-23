import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTodoLists, saveTodoLists } from "../utils/localStorageUtils";
import "../styles/TodoGrid.scss";

const TodoGrid = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const navigate = useNavigate();

  // Загружаем список todo из localStorage
  useEffect(() => {
    const lists = getTodoLists();
    setTodoLists(lists);
  }, []);

  // Сохраняем измененные списки в localStorage при изменении состояния todoLists
  useEffect(() => {
    if (todoLists.length > 0) {
      saveTodoLists(todoLists);
    }
  }, [todoLists]);

  // Добавление нового списка
  const addTodoList = () => {
    if (newListName.trim()) {
      const newList = { id: Date.now(), name: newListName, tasks: [] };
      setTodoLists((prevLists) => [...prevLists, newList]);
      setNewListName(""); 
    } else {
      alert("List name is required");
    }
  };

  // Удаление списка
  const deleteTodoList = (listId, event) => {
    event.stopPropagation(); 
    setTodoLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  // Открытие выбранного списка
  const openTodoList = (listId) => {
    navigate(`/todos/${listId}`);
  };

  return (
    <div className="todo-grid-container">
      <h2 className="todo-grid-title">Todos</h2>
      <div className="todo-grid-input-section">
        <input
          type="text"
          placeholder="New list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="todo-grid-input"
        />
        <button onClick={addTodoList} className="todo-grid-button">
          Add List
        </button>
      </div>
      <div className="todo-grid">
        {todoLists.length > 0 ? (
          todoLists.map((list) => (
            <div
              key={list.id}
              className="todo-grid-item"
              onClick={() => openTodoList(list.id)}
            >
              <h3 className="todo-grid-item-title">{list.name}</h3>
              <button
                onClick={(e) => deleteTodoList(list.id, e)}
                className="todo-grid-item-delete"
              >
                Del
              </button>
            </div>
          ))
        ) : (
          <p>No To-Do Lists Found</p>
        )}
      </div>
    </div>
  );
};

export default TodoGrid;
