const socketio = require("socket.io");

const io = socketio(3001, {
  cors: {
    origin: "*",
    methods: ["Get", "Post"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected:", socket);
});
