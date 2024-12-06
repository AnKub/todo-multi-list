import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTodoListPage = () => {
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!listName.trim()) {
      alert("Please enter a name for the To-Do list.");
      return;
    }

    const newList = {
      id: Date.now(),
      name: listName,
      tasks: [],
    };

    const existingLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    localStorage.setItem("todoLists", JSON.stringify([...existingLists, newList]));

    navigate("/todos");
  };

  return (
    <div className="create-todo-list">
      <h1>Create a New To-Do List</h1>
      <input
        type="text"
        placeholder="Enter list name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <button onClick={handleCreate}>Create List</button>
      <button onClick={() => navigate("/todos")}>Back to Lists</button>
    </div>
  );
};

export default CreateTodoListPage;
