import { Express } from "express"
import { ACTIONS, API, Player, Room } from "../../shared"

export const rooms: Record<string, Room> = {}

const PATH = `/api/room`

export function useRoomAPI(app: Express) {
  app.get<API.Room.GetParams>(`${PATH}/:room`, ({ params }, res) => {
    res.send({
      room: rooms[params.room],
    } as API.Room.GetResponse)
  })

  app.post<unknown, unknown, API.Room.PostRequest>(PATH, (req, res) => {
    const { player } = req.body

    const admin = new Player(player.id, player.name)
    admin.setAdmin()

    const room = new Room(admin)
    rooms[room.id] = room

    console.log("Se creó una nueva sala:", room.id)

    res.send({ room: rooms[room.id] } as API.Room.PostResponse)
  })

  app.put<API.Room.PutParams, unknown, API.Room.PutRequest>(
    `${PATH}/:room`,
    (req, res) => {
      const { params, body } = req

      const room = rooms[params.room]

      if (room != null) {
        const player = new Player(body.player.id, body.player.name)

        room.addGuest(player)

        console.log(`Se unió el jugador ${player.name} a la sala ${room.id}`)

        res.send({ room } as API.Room.PutResponse)
      } else {
        res.status(404).send(`Room not found: ${params.room}`)
      }
    },
  )
}
