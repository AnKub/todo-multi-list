import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import RegistrationPage from "./pages/RegistrationPage";
import CreateTodoListPage from "./components/CreateTodoListPage";
import TodoGrid from "./components/TodoGrid";
import LocationWrapper from "./LocationWrapper";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import "./styles/main.scss";

const App = () => {
  return (
    <Router>
      <LocationWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/todos" element={<TodoGrid />} />
            <Route path="/todos/create" element={<CreateTodoListPage />} />
            <Route path="/todos/:id" element={<TodoList />} />
          </Route>
        </Routes>
      </LocationWrapper>
    </Router>
  );
};

export default App;
