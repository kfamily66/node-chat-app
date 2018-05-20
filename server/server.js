const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public/");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath));

io.on("connect", socket => {
  console.log("New user connected");

  socket.on("createMessage", message => {
    console.log("Created new message:", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on("disconnect", socket => {
    console.log("User disconnected");
  });
});

server.listen(port, () => console.log(`Server is up on port ${port}`));
