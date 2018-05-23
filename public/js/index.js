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

socket.on("newLocationMessage", message => {
  var messages = document.querySelector("#messages");
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.setAttribute("href", message.url);
  a.setAttribute("target", "_blank");
  a.textContent = "My current location";
  li.appendChild(a);
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

var location_btn = document.querySelector("#send-location");
location_btn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Your browser not supported geolocation APIs");
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(position);
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      alert("Unable to fetch location!");
    }
  );
});
