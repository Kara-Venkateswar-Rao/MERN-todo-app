const express = require("express");
const cors = require("cors");
const blogRouter = require("./router/todoRouter");
const port = 4004;
const app = express();

require("./databse");

app.use(cors());
app.use(express.json());

app.use("/api/todos", blogRouter);

app.use("/api", (req, res) => {
  res.send("hello Mern Stack TODO");
});

app.listen(port, () => console.log(`app is listening at port No ${port}...`));
