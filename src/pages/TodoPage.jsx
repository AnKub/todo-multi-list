// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../styles/main.scss";

// const TodoPage = () => {
//   const [todoLists, setTodoLists] = useState([]);

//   useEffect(() => {
//     const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
//     setTodoLists(storedLists);
//   }, []);

//   const handleDeleteList = (id) => {
//     const updatedLists = todoLists.filter((list) => list.id !== id);
//     localStorage.setItem("todoLists", JSON.stringify(updatedLists));
//     setTodoLists(updatedLists);
//   };

//   return (
//     <div className="todo-page">
//       <h1>To-Do`s</h1>
//       <Link to="/todos/create">
//         <button className="todo-create-button">Create New List</button>
//       </Link>
//       <div className="todo-list-container">
//         {todoLists.length === 0 ? (
//           <p>No To-Do lists available.</p>
//         ) : (
//           todoLists.map((list) => (
//             <div key={list.id} className="todo-list-item">
//               <h3>{list.name}</h3>
//               <Link to={`/todos/${list.id}`} className="todo-list-link">View Tasks</Link>
//               <button onClick={() => handleDeleteList(list.id)}>Delete</button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodoPage;
