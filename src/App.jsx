import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import RegistrationPage from "./pages/RegistrationPage";
import CreateTodoListPage from "./components/CreateTodoListPage";
import TodoGrid from "./components/TodoGrid";
import TodoDetailPage from "./pages/TodoDetailPage";
import LocationWrapper from "./LocationWrapper";
import Layout from "./layout/Layout" 
import "./styles/main.scss";

const App = () => {
  return (
    <Router>
      <LocationWrapper>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route element={<Layout />}>
          <Route path="/todos" element={<TodoGrid />} />
          <Route path="/todos/create" element={<CreateTodoListPage />} />
          <Route path="/todos/:id" element={<TodoList />} />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
          <Route path="*" element={<RegistrationPage />} />
          </Route>          
        </Routes>
      </LocationWrapper>
    </Router>
  );
};

export default App;
