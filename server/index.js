const socketio = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./Document");

mongoose.connect(
  "mongodb+srv://manav:manav@cluster0.hcqem.mongodb.net/DocsNow?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const io = socketio(3001, {
  cors: {
    origin: "*",
    methods: ["Get", "Post"],
  },
});

const defaultValue = "Your DocId: ";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDoc(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });

  console.log("Connected:");
});

async function findOrCreateDoc(id) {
  if (id == null) return;

  const document = await Document.findOne({ _id: id });

  if (!document) {
    return await Document.create({ _id: id, data: defaultValue + id });
  }

  return document;
}
