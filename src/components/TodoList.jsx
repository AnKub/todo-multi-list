import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

const TodoList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    reminderDate: "",
  });

  const addTask = () => {
    if(newTask.title) {
      const task = {...newTask, id:Date.now()};
      setTasks([...tasks,task]);
      setNewTask({ title:"", dueDate:"", reminderDate:""});
    }else{
      alert('task title is required');
    }
  };

  // delete
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

 
  return (
    <div>
      <button onClick={() => navigate("/todos")}>Back to Lists</button>
      <h2>To-Do List {id}</h2>
      <div>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} 
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;