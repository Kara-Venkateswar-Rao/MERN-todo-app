// mongodb+srv://karabikash30:venkateswar123@todo.oe3gzwt.mongodb.net/

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://karabikash30:venkateswar123@todo.oe3gzwt.mongodb.net/"
  )
  .then(() => console.log("connected successfully"))
  .catch((e) => console.log(e));
