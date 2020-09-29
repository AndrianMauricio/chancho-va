import express from "express"
import { createServer } from "http"
import socketIO from "socket.io"
import path from "path"
import bodyParser from "body-parser"
import { useRoomAPI } from "./apis/room"

const app = express()
const server = createServer(app)
const PORT = process.env.PORT ?? 8080
const io = socketIO(server)

app.use(express.static(path.join(__dirname, "..", "public")))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

useRoomAPI(app)

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

io.on("connection", () => {})

server.listen(PORT, null, () =>
  console.log(`Server started in http://localhost:${PORT}`),
)
