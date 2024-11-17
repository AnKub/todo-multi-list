import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import TodoGrid from "./components/TodoGrid";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<RegistrationForm/>}/>
        <Route path="/todos" element = {<TodoGrid/>}/>
        <Route path="/todos/:id" element = {<TodoList/>}/>
      </Routes>
    </Router>
  );
};
export default App;