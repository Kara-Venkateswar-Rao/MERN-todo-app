const express = require("express");
const cors = require("cors");
const blogRouter = require("./router/todoRouter");
const port = 4004;
const app = express();

require("./databse");

app.use(cors(
  {
    origin: ['https://mern-todo-frontend-lac.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'GELETE'],
    credentials: true,  
  }
));
app.use(express.json());

app.use("/api/todos", blogRouter);

app.use("/api", (req, res) => {
  res.send("hello Mern Stack TODO");
});

app.listen(port, () => console.log(`app is listening at port No ${port}...`));
