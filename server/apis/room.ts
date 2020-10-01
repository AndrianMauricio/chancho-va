import { Express } from "express"
import { API, SharedPlayer, RoomInServer } from "../../shared"

export const rooms: Record<string, RoomInServer> = {}

const PATH = `/api/room`

export function useRoomAPI(app: Express) {
  app.get<API.Room.GetParams>(`${PATH}/:room`, ({ params }, res) => {
    res.send({
      room: rooms[params.room],
    } as API.Room.GetResponse)
  })

  app.post<unknown, unknown, API.Room.PostRequest>(PATH, (req, res) => {
    const { player } = req.body

    const admin = new SharedPlayer({
      id: player.id,
      name: player.name,
      isAdmin: true,
    })

    admin.setAdmin()

    const room = new RoomInServer(admin)

    rooms[room.id] = room

    console.log("Se creó una nueva sala:", {
      roomID: room.id,
      player: player.name,
    })

    res.send({ room: rooms[room.id] } as API.Room.PostResponse)
  })

  app.put<API.Room.PutParams, unknown, API.Room.PutRequest>(
    `${PATH}/:room`,
    (req, res) => {
      const { params, body } = req

      const room = rooms[params.room]

      if (room != null) {
        const player = new SharedPlayer({
          id: body.player.id,
          name: body.player.name,
          isAdmin: false,
        })

        room.addGuest(player)

        console.log(`Se unió un jugador a la sala:`, {
          roomID: room.id,
          player: player.name,
        })

        res.send({ room } as API.Room.PutResponse)
      } else {
        res.status(404).send(`Room not found: ${params.room}`)
      }
    },
  )
}
