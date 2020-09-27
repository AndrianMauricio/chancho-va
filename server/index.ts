import express from "express"
import { createServer } from "http"
import socketIO from "socket.io"
import path from "path"

const app = express()
const server = createServer(app)
const PORT = process.env.PORT ?? 8080
const io = socketIO(server)

app.use(express.static(path.join(__dirname, "..", "public")))

app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

io.on("connection", (socket) => {
  console.log(socket.id)
})

server.listen(PORT, null, () =>
  console.log(`Server started in http://localhost:${PORT}`),
)
