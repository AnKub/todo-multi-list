// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { TodoList } from "../types";
// import { getTodoLists, saveTodoLists } from "../localStorageUtils";
// import "../styles/TodoGrid.scss";
// import "../styles/main.scss";

// const TodoGrid: React.FC = () => {
//   const [todoLists, setTodoLists] = useState<TodoList[]>([]);
//   const [newListName, setNewListName] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTodoLists(getTodoLists());
//   }, []);

//   const addTodoList = () => {
//     if (newListName.trim()) {
//       const newList: TodoList = { id: Date.now(), name: newListName, tasks: [] };
//       const updatedLists = [...todoLists, newList];
//       setTodoLists(updatedLists);
//       saveTodoLists(updatedLists);
//       setNewListName("");
//     } else {
//       alert("List name is required");
//     }
//   };

//   const deleteTodoList = (listId: number, event: React.MouseEvent) => {
//     event.stopPropagation();
//     const updatedLists = todoLists.filter((list) => list.id !== listId);
//     setTodoLists(updatedLists);
//     saveTodoLists(updatedLists);
//   };

//   const openTodoList = (listId: number) => navigate(`/todos/${listId}`);

//   return (
//     <div className="todo-grid-container">
//       <h2 className="todo-grid-title">To-Do Lists</h2>
//       <div>
//         <input
//         className="todo-grid-input"
//           type="text"
//           placeholder="New list name"
//           value={newListName}
//           onChange={(e) => setNewListName(e.target.value)}
//         />
//         <button className="todo-grid-button" onClick={addTodoList}>Add List</button>
//       </div>
//       <div className="todo-grid">
//         {todoLists.length ? (
//           todoLists.map((list) => (
//             <div
//               key={list.id}
//               className="todo-grid-item"
//               onClick={() => openTodoList(list.id)}
//             >
//               <h3 className="todo-grid-item-title">{list.name}</h3>
//               <button className="todo-grid-item-delete" onClick={(e) => deleteTodoList(list.id, e)}>Del</button>
//             </div>
//           ))
//         ) : (
//           <p>No To-Do Lists Found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodoGrid;
