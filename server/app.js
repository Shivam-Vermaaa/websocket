import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
const port = 4000;
const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // dont add / in the last
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// here we connect to the client
io.on("connection", (socket) => {
  console.log("User Connected");
  console.log(socket.id);
  //   socket.emit("welcome", "Welcome to the Socket Server");
  //   socket.broadcast.emit("welcome", `broadcast for auser ${socket.id}`); // if there is only one socket then it will not run,
  //  this will for more than one client [socket]. jo client pahle connect ho jata ha vo as a sender kam karta ha aur baki as revicer
  socket.emit("welcome", `Welcome to the Socket Server`);

  socket.on("khat", (msg) => {
    console.log("khat", msg);
  });
  socket.on("messages", ({ message, room }) => {
    console.log("message", message, "rooms--", room);

    // socket.broadcast.emit("receive-message", msg);
    socket.to(room).emit("receive-message", message);
  });
});

io.on("disconnect", () => {
  console.log("User Disconnected"); /// this will trigger when  a client disconnect means when client trigger the disconnect
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);  // this creates a http server
// });
server.listen(port, () => {
  console.log(`Server is running on port ${port}`); // this creates a socket server
});
