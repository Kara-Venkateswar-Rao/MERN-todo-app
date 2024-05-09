import React, { useContext, useEffect } from "react";
import { TodoContext } from "../context/Context";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function Todo() {
  const { todoData, setTodoData, todoList, setTodoList, isEdit, setIsEdit } =
    useContext(TodoContext);

  const location = useLocation();
  const navigate = useNavigate();

  console.log(todoData);
axios.defaults.withcredentials = true;
  async function handelSaveToDatabase() {
    const response = isEdit
      ? await axios.put(
          `https://mern-todo-backend-six.vercel.app/${location.state.currentTodo._id}`,
          {
            title: todoData.title,
            todo: todoData.todo,
          }
        )
      : await axios.post(`https://mern-todo-backend-six.vercel.app`, {
          title: todoData.title,
          todo: todoData.todo,
        });

    const result = response.data;
    // console.log(result);

    if (result) {
      setIsEdit(false);
      setTodoData({
        title: "",
        todo: "",
      });
    }
  }

  async function fetchTodoLists() {
    const response = await axios.get(`https://mern-todo-backend-six.vercel.app`);
    const result = await response.data;

    if (result) {
      setTodoList(result.todoList);
    } else {
      setTodoList([]);
    }
  }

  async function handelDeleteTodo(id) {
    console.log(id);
    const response = await axios.delete(
      `https://mern-todo-backend-six.vercel.app/${id}`
    );

    const result = await response.data;
    console.log(result);
    if (result?.massage) {
      fetchTodoLists();
    }
  }

  async function handeleEditTodo(currentTodo) {
    console.log(currentTodo);
    setIsEdit(true);
    navigate("/", { state: { currentTodo } });
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { currentTodo } = location.state;

      setTodoData({
        title: currentTodo.title,
        todo: currentTodo.todo,
      });
    }
  }, [location]);

  useEffect(() => {
    fetchTodoLists();
    setTodoData({
      title: "",
      todo: "",
    });
  }, []);

  return (
    <div className=" bg-slate-600  p-2 relative">
      <h1 className=" text-white">Todo List</h1>
      <div className="flex gap-5 justify-center ">
        <div className="flex justify-center gap-3">
          <input
            className="border"
            type="text"
            id="title"
            placeholder="Enter Todo Title"
            value={todoData.title}
            onChange={(e) =>
              setTodoData({
                ...todoData,
                title: e.target.value,
              })
            }
          />
          <textarea
            className="border h-8 flex items-center"
            id="todo"
            placeholder="Enter Todo"
            value={todoData.todo}
            onChange={(e) =>
              setTodoData({
                ...todoData,
                todo: e.target.value,
              })
            }
          ></textarea>
        </div>
        <button
          disabled={!todoData}
          onClick={handelSaveToDatabase}
          className={` bg-slate-400 px-5 ${
            todoData.length && " cursor-not-allowed"
          }`}
        >
          {isEdit ? "Edit Todo" : "Add Todo"}
        </button>
      </div>
      <div className=" mt-5  relative flex flex-wrap gap-10 justify-center p-2">
        {todoList && todoList.length ? (
          todoList.map((todoItem) => (
            <div
              key={todoItem._id}
              className=" bg-slate-300 w-48 h-auto p-2 rounded-md"
            >
              <label htmlFor="" className=" font-bold">
                {todoItem.title}
              </label>
              <div>
                <ol>{todoItem.todo}</ol>
              </div>
              <div className="flex justify-between">
                <FaEdit onClick={() => handeleEditTodo(todoItem)} />
                <FaTrash onClick={() => handelDeleteTodo(todoItem._id)} />
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Todo;
