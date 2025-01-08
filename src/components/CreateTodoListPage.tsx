// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getTodoLists, saveTodoLists } from "../localStorageUtils";

// const CreateTodoListPage: React.FC = () => {
//   const [listName, setListName] = useState<string>(""); 
//   const navigate = useNavigate();

//   const handleCreate = () => {
//     if (!listName.trim()) {
//       alert("Please enter a name for the To-Do list.");
//       return;
//     }

//     const newList = {
//       id: Date.now(),
//       name: listName,
//       tasks: [],
//     };

//     const existingLists = getTodoLists();
//     existingLists.push(newList); 
//     saveTodoLists(existingLists); 

//     navigate("/todos");
//   };

//   return (
//     <div className="create-todo-list">
//       <h1>New To-Do List</h1>
//       <input
//         type="text"
//         placeholder="Enter list name"
//         value={listName}
//         onChange={(e) => setListName(e.target.value)}
//       />
//       <button onClick={handleCreate}>Create List</button>
//       <button onClick={() => navigate("/todos")}>Back to Lists</button>
//     </div>
//   );
// };

// export default CreateTodoListPage;
