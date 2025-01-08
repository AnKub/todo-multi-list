import React, { useState, useEffect } from "react";
import { TaskItemProps } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/main.scss";
import "../styles/TaskItem.scss";

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title || "");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // Зберігаємо дату виконання, якщо вона є
  useEffect(() => {
    if (task.dueDate) {
      setDueDate(new Date(task.dueDate));
    }
  }, [task.dueDate]);

  // Оновлюємо задачу
  const handleUpdate = () => {
    if (newTitle.trim()) {
      onUpdate(task.id, newTitle, dueDate);
      setIsEditing(false);
    } else {
      alert("Task title cannot be empty");
    }
  };

  // Відображаємо компонент
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="task-item-edit-input"
        />
      ) : (
        <span onClick={() => onToggle(task.id)} className="task-item-title">
          {task.title}
        </span>
      )}
      <div className="task-buttom">
        {isEditing ? (
          <button onClick={handleUpdate} className="task-item-save">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="task-item-edit">
            Edit
          </button>
        )}
        <button onClick={() => onDelete(task.id)} className="task-item-delete">
          Del
        </button>

        {/* Обгортка для DatePicker */}
        {isEditing && (
          <div className="task-item-datepicker">
            <DatePicker
              selected={dueDate}
              onChange={(date: Date | null) => setDueDate(date)}
              placeholderText="Set due date"
            />
            <p>{dueDate ? dueDate.toLocaleDateString() : "+"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
