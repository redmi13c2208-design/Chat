const socket = io();

const messages =
document.getElementById("messages");

function sendMessage(){

const username =
document.getElementById("username").value;

const message =
document.getElementById("message").value;

if(!username || !message) return;

socket.emit("chatMessage", {
username,
message
});

document.getElementById("message").value = "";

}

socket.on("newMessage", data => {

const div =
document.createElement("div");

div.classList.add("message");

div.innerHTML =
`<strong>${data.username}</strong>: ${data.message}`;

messages.appendChild(div);

messages.scrollTop =
messages.scrollHeight;

});
