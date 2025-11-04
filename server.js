import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// NOTE: Render pe same-origin serve kar rahe hain, isliye basic CORS ok.
const io = new Server(server, {
  pingTimeout: 20000,
  pingInterval: 25000
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  // client se: { roomId, name }
  socket.on("join", ({ roomId, name }) => {
    if (!roomId || !name) return;
    socket.data.name = name;
    socket.join(roomId);
    // room ko join/leave updates
    socket.to(roomId).emit("system", `${name} joined`);
  });

  // client se: { roomId, text }
  socket.on("message", ({ roomId, text }) => {
    const from = socket.data.name || "Anonymous";
    if (!roomId || !text) return;
    const payload = { from, text, ts: Date.now() };
    // sender ko bhi dikhao + others
    io.to(roomId).emit("message", payload);
  });

  socket.on("disconnecting", () => {
    const name = socket.data.name;
    const rooms = [...socket.rooms].filter(r => r !== socket.id);
    rooms.forEach(r => {
      if (name) socket.to(r).emit("system", `${name} left`);
    });
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`✅ Server listening on ${PORT}`);
});
