var socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
  const params = $.deparam(window.location.search);

  socket.emit("join", params, err => {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on("newMessage", message => {
  var formattedTime = moment(message.createdAt).format("H:mm");
  var template = document.querySelector("#message-template").textContent;
  var messages = document.querySelector("#messages");

  html = Mustache.render(template, {
    text: message.text,
    createdAt: formattedTime,
    from: message.from
  });
  messages.innerHTML += html;
  scrollToBottom();
});

socket.on("newLocationMessage", message => {
  var formattedTime = moment(message.createdAt).format("H:mm");
  var messages = document.querySelector("#messages");
  var template = document.querySelector("#location-message-template")
    .textContent;

  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  messages.innerHTML += html;
  scrollToBottom();
});

socket.on("updateUserList", users => {
  const user_list = document.createElement("ol");
  const side_list = document.querySelector("#users");

  users.forEach(user => {
    li = document.createElement("li");
    li.textContent = user;
    user_list.appendChild(li);
  });

  side_list.innerHTML = "";
  side_list.appendChild(user_list);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

document.querySelector("#message-form").addEventListener("submit", e => {
  e.preventDefault();
  var messageTextbox = document.querySelector("input[name = message]");

  socket.emit("createMessage", { text: messageTextbox.value }, () => {
    messageTextbox.value = "";
  });
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

function scrollToBottom() {
  var messages = document.querySelector("#messages");
  var newMessage = document.querySelector("#messages li:last-child");
  var prevMessage = document.querySelector("#messages li:nth-last-child(2)");

  var clientHeight = messages.clientHeight;
  var scrollHeight = messages.scrollHeight;
  var scrollTop = messages.scrollTop;

  var newMessageHeight = newMessage.offsetHeight;
  if (prevMessage) {
    var prevMessageHeight = prevMessage.offsetHeight;
  } else {
    var prevMessageHeight = 0;
  }

  if (
    clientHeight + scrollTop + newMessageHeight + prevMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop = scrollHeight;
  }
}
