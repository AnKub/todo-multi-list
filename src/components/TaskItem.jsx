import React from "react";
import "../styles/main.scss";

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <span onClick={() => onToggle(task.id)} className="task-item-title">
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)} className="task-item-delete">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
