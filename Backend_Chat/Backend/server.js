const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRouter");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorHandlers");

// allow all origins by default for handling cors error
app.use(cors());

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((response) => {
    console.log(`Mongodb is Connected..............`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(express.json()); // body
app.use(express.urlencoded({ extended: true }));

// sign and login routes
app.use("/api/user", userRoutes);

// chat routes
app.use("/api/chats", chatRoutes);

//message routes
app.use("/api/messages", messageRoutes);

////////////deployment////////

////////////deployment////////

//error handlers
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, hostname, () => {
  console.log(`Server starts running on ${port}...`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room :" + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newmMessageRecieved) => {
    var chat = newmMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newmMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message received", newmMessageRecieved);
    });
  });
});
