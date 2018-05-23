var socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("newMessage", message => {
  var formattedTime = moment(message.createdAt).format("H:mm");

  var messages = document.querySelector("#messages");
  var li = document.createElement("li");
  li.textContent = `${formattedTime} ${message.from}:${message.text}`;
  messages.appendChild(li);
});

socket.on("newLocationMessage", message => {
  var formattedTime = moment(message.createdAt).format("H:mm");
  var messages = document.querySelector("#messages");
  var li = document.createElement("li");
  li.textContent = `${formattedTime} ${message.from}: `;

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
  var messageTextbox = document.querySelector("input[name = message]");
  socket.emit(
    "createMessage",
    { from: "User", text: messageTextbox.value },
    () => {
      messageTextbox.value = "";
    }
  );
});

var location_btn = document.querySelector("#send-location");
location_btn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Your browser is not supported geolocation APIs");
  }

  location_btn.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition(
    position => {
      location_btn.removeAttribute("disabled");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      location_btn.removeAttribute("disabled");
      alert("Unable to fetch location!");
    }
  );
});
