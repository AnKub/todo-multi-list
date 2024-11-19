import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import TaskItem from "./TaskItem";

const TodoList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    reminderDate: "",
  });
  

  // Загрузка задач из localStorage
  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const currentList = storedLists.find((list) => list.id === Number(id));
    if (currentList) {
      setTasks(currentList.tasks);
    }
  }, [id]);

  // Сохранение задач в localStorage
  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const updatedLists = storedLists.map((list) => {
      if (list.id === Number(id)) {
        return { ...list, tasks };
      }
      return list;
    });
    localStorage.setItem("todoLists", JSON.stringify(updatedLists));
  }, [tasks, id]);

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