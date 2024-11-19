import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TodoGrid = ()=>{
  const [todoLists, setTodoLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const navigate = useNavigate();

 // Загрузка данных из localStorage при монтировании
 useEffect(() => {
  const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
  setTodoLists(storedLists);
}, []);

// Сохранение данных в localStorage при изменении списка
useEffect(() => {
  localStorage.setItem("todoLists", JSON.stringify(todoLists));
}, [todoLists]);

  const addTodoList = ()=>{
    if(newListName.trim()){
      const newList = {id: Date.now(), name: newListName, tasks:[]};
      setTodoLists([...todoLists, newList]);
      setNewListName("");
    }else{
      alert("List name is required")
    }
  };
  // delete list
  const deleteTodoList = (listId) => {
    setTodoLists(todoLists.filter((list)=> list.id !== listId));
  };

  // change list focus
  const openTodoList = (listId)=>{
    navigate(`/todos/${listId}`);
  };

  return (
    <div className="todo-grid-container">
      <h1 className="todo-grid-title">My TODO</h1>
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
      <div className="todo-grid">
        {todoLists.map((list) => (
          <div
            key={list.id}
            className="todo-grid-item"
            onClick={() => openTodoList(list.id)}
          >
            <h3 className="todo-grid-item-title">{list.name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodoList(list.id);
              }}
              className="todo-grid-item-delete"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoGrid;