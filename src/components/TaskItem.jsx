import React from "react";

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task-item ${task.completed ? "task-item-completed" : "task-item-pending"}`}
    >
      <span
        className="task-item-title"
        onClick={() => onToggle(task.id)}
      >
        {task.title}
      </span>
      <button
        className="task-item-delete"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;