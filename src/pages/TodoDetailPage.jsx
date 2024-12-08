import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const foundList = storedLists.find((list) => list.id === Number(id));
    setList(foundList);
  }, [id]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const updatedList = {
      ...list,
      tasks: [...list.tasks, { id: Date.now(), text: newTask }],
    };
    updateLocalStorage(updatedList);
    setNewTask("");
  };

  const handleDeleteTask = (taskId) => {
    const updatedList = {
      ...list,
      tasks: list.tasks.filter((task) => task.id !== taskId),
    };
    updateLocalStorage(updatedList);
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditTaskText(task.text);
  };

  const handleSaveEdit = (taskId) => {
    const updatedList = {
      ...list,
      tasks: list.tasks.map((task) =>
        task.id === taskId ? { ...task, text: editTaskText } : task
      ),
    };
    updateLocalStorage(updatedList);
    setEditingTask(null);
    setEditTaskText("");
  };

  const updateLocalStorage = (updatedList) => {
    const allLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const updatedLists = allLists.map((item) =>
      item.id === updatedList.id ? updatedList : item
    );

    localStorage.setItem("todoLists", JSON.stringify(updatedLists));
    setList(updatedList);
  };

  if (!list) return <p>Loading...</p>;

  return (
    <div className="todo-detail-page">
      <div className="todo-detail-header">
        <h1>{list.name}</h1>
        <button onClick={() => navigate("/todos")}>Back to Lists</button>
      </div>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {list.tasks.map((task) => (
          <li
            key={task.id}
            className="todo-detail-task"
            onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
          >
            {editingTask === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.text}
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoDetailPage;
