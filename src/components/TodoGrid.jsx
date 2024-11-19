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
    <div style={{ padding: "20px" }}>
      <h1>My TODO</h1>
      <input
        type="text"
        placeholder="New list name"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <button onClick={addTodoList}>Add List</button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {todoLists.map((list) => (
          <div
            key={list.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              width: "150px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => openTodoList(list.id)}
          >
            <h3>{list.name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodoList(list.id);
              }}
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