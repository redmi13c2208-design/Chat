const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatapp"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

io.on("connection", socket => {

  console.log("User Connected");

  socket.on("chatMessage", data => {

    db.query(
      "INSERT INTO messages(username,message) VALUES(?,?)",
      [data.username, data.message]
    );

    io.emit("newMessage", data);

  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

});

server.listen(3000, () => {
  console.log("Server Running");
});