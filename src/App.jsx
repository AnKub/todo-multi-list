import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import RegistrationPage from "./pages/RegistrationPage";
import TodoPage from "./pages/TodoPage";
import TodoDetailPage from './pages/TodoDetailPage';
import './styles/main.scss';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/todos/:id" element={<TodoList />} />
        <Route path="/todo/:id" element={TodoDetailPage} />
      </Routes>
    </Router>
  );
};

export default App;
