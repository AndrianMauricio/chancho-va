import express from "express"
import { createServer } from "http"
import socketIO from "socket.io"
import path from "path"
import bodyParser from "body-parser"
import { rooms, useRoomAPI } from "./apis/room"
import { RoomInServer, SharedPlayer, Socket } from "../shared"

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

io.on("connect", socket => {
  console.log("Nuevo jugador:", socket.id)

  const { sessionID } = socket.request._query

  let room: RoomInServer | undefined

  roomLoop: for (const [, _room] of Object.entries(rooms)) {
    for (const [, _player] of Object.entries(_room.players)) {
      if (_player.id === sessionID) {
        room = _room
        break roomLoop
      }
    }
  }

  if (room != null) {
    socket.emit("player_returned", { room } as Socket.Server.PlayerReturnedEmit)
  }

  socket.on("new-player", ({ player, roomID }: Socket.Client.NewPlayerEmit) => {
    socket.join(roomID)

    socket.to(roomID).emit("new-player", {
      playerName: player.name,
    } as Socket.Server.NewPlayerEmit)
  })
})

server.listen(PORT, null, () => {
  console.log(`Server started in http://localhost:${PORT}`)
})
