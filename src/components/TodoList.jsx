import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

const TodoList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate:"",
    reminderDate:"",
    image: null,
  });

  const addTask = () => {
    if(newTask.title) {
      const task = {...newTask, id:Date.now()};
      setTasks([...tasks,task]);
      setNewTask({ title: "", dueDate:"", reminderDate:"", image: null, });

    }else{
      alert('task title is required');
    }
  };

  // delete
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleImageUpload = (e) => {
    const file = e.terget.files[0];
    if(file) {
      setNewTask({...newTask, image:URL.createObjectURL(file)});
    }
  };
  return (
    <div>
        <button onClick={() => navigate("/todos")}>Back to To-Do Lists</button>
        <h2>To-Do List: {id}</h2>
        <div>
            <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <input
                type="date"
                value={newTask.reminderDate}
                onChange={(e) => setNewTask({ ...newTask, reminderDate: e.target.value })}
            />
            <input type="file" onChange={handleImageUpload} />
            <button onClick={addTask}>Add Task</button>
        </div>

        <div>
            <h3>Tasks</h3>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h4>{task.title}</h4>
                    <p>Due: {task.dueDate || "No date set"}</p>
                    <p>Reminder: {task.reminderDate || "No reminder set"}</p>
                    {task.image && (
                        <img
                            src={task.image}
                            alt="Task"
                            style={{ width: "100px", height: "100px" }}
                        />
                    )}
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    </div>
);
};

export default TodoList;