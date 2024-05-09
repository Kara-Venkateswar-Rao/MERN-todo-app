import { useState } from "react";

import "./App.css";
import Todo from "./component/Todo";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
