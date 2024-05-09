import React, { createContext, useState } from "react";

export const TodoContext = createContext(null);

function TodoState({ children }) {
  const [todoData, setTodoData] = useState({
    title: "",
    todo: "",
  });
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <TodoContext.Provider
      value={{
        todoData,
        setTodoData,
        todoList,
        setTodoList,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoState;
