import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoGrid = ()=>{
  const [todoLists, setTodoLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const navigate = useNavigate();

  const addTodoList = ()=>{
    if(newListName){
      const newList = {id: Date.now(), name: newListName};
      setTodoLists([...todoLists, newList]);
      setNewListName("");
    }
  };

  return (
    <div>
      <h2>My To-DO lists</h2>
      <input type="text" 
      placeholder = "New TO-DO list name"
      value={newListName}
      onChange={(e) => setNewListName(e.target.value)}
      />
        <button onClick={addTodoList}>List <h2>+</h2></button>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {todoLists.map((list) => (
                    <div
                        key={list.id}
                        style={{ border: "1px solid gray", padding: "10px", cursor: "pointer" }}
                        onClick={() => navigate(`/todos/${list.id}`)}
                    >
                        <h3>{list.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoGrid;