var socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("newMessage", message => {
  console.log("Got new message:", message);

  var messages = document.querySelector("#messages");
  var li = document.createElement("li");
  li.textContent = `${message.from}:${message.text}`;
  messages.appendChild(li);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

document.querySelector("#message-form").addEventListener("submit", e => {
  e.preventDefault();
  var text = document.querySelector("input[name = message]").value;
  socket.emit("createMessage", { from: "User", text }, () => {});
  document.querySelector("input[name = message]").value = "";
});
