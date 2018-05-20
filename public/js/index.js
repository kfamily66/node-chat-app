var socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("newMessage", msg => {
  console.log("Got new message:", msg);
});

socket.emit("createMessage", {
  from: "Client",
  text: "Created message from client to server",
  createdAt: new Date()
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
