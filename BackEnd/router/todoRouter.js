const express = require("express");
const todoRouter = express.Router();

const {
  fetchTodos,
  addTodo,
  deleteTodo,
  editTodo,
} = require("../controller/TodoController");

todoRouter.get("/", fetchTodos);
todoRouter.post("/add", addTodo);
todoRouter.delete("/delete/:id", deleteTodo);
todoRouter.put("/edit/:id", editTodo);

module.exports = todoRouter;
