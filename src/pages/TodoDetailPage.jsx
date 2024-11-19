import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/main.scss'; 

const TodoDetailPage = () => {
  const { id } = useParams(); 
  const history = useHistory(); 

  const [task, setTask] = useState(null);

  // downl localStorage id
  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('todoLists')) || [];
    const currentList = storedLists.find((list) => list.id === Number(id));
    const task = currentList ? currentList.tasks.find((task) => task.id === Number(id)) : null;
    setTask(task);
  }, [id]);

  //del
  const handleDelete = () => {
    const storedLists = JSON.parse(localStorage.getItem('todoLists')) || [];
    const updatedLists = storedLists.map((list) => {
      if (list.id === Number(id)) {
        list.tasks = list.tasks.filter((task) => task.id !== Number(id));
      }
      return list;
    });
    localStorage.setItem('todoLists', JSON.stringify(updatedLists));
    history.push(`/todo/${id}`); 
  };

  if (!task) {
    return <div>Задача не найдена!</div>;
  }

  return (
    <div className="todo-detail-page">
      <div className="todo-detail-header">
        <h2 className="todo-detail-title">{task.title}</h2>
        <button className="todo-detail-button" onClick={handleDelete}>
          Удалить задачу
        </button>
      </div>
      <div className="todo-detail-task">
        <p>{task.description}</p>
      </div>
    </div>
  );
};

export default TodoDetailPage;
