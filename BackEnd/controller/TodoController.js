const mongoose = require("mongoose");
const Todo = require("../model/TodoModel");
const { json } = require("express");

// read / fetch all Todos

const fetchTodos = async (req, res) => {
  let todoList;

  try {
    todoList = await Todo.find();
  } catch (error) {
    console.log(error);
  }

  if (!todoList) {
    return res.status(404).json({ massage: "Todo is empty add some todos" });
  }

  return res.status(200).json({ todoList });
};

// add Todos

const addTodo = async (req, res) => {
  const { title, todo } = req.body;
  const currentDate = new Date();

  const newlyAddedTodo = new Todo({
    title,
    todo,
    date: currentDate,
  });

  try {
    await newlyAddedTodo.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyAddedTodo.save(session);
    session.commitTransaction();
  } catch (error) {
    console.log(error);
    res.send(500).json({ massage: error });
  }

  return res.status(200).json({ newlyAddedTodo });
};

// delete Todos

const deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentTodo = await Todo.findByIdAndDelete(id);

    if (!findCurrentTodo) {
      return res.status(404).json({ massage: "No Todo Found" });
    }
    return res.status(200).json({ massage: " Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ massage: "unable to delete! Please try again later..." });
  }
};

// Edit Todos
const editTodo = async (req, res) => {
  const id = req.params.id;

  const { title, todo } = req.body;

  let currentTodoToEdit;

  try {
    currentTodoToEdit = await Todo.findByIdAndUpdate(id, {
      title,
      todo,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ massage: "unable to edit the todo! please try again later" });
  }

  if (!currentTodoToEdit) {
    return res.status(500).json({ massage: "unable to update" });
  }

  return res.status(200).json({ currentTodoToEdit });
};

module.exports = { fetchTodos, addTodo, deleteTodo, editTodo };
