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

    res.send({
      room: rooms[room.id],
    })
  })

  app.put<API.Room.GetParams, unknown, API.Room.PostRequest>(
    `${PATH}/:room`,
    (req, res) => {
      const { params, body } = req

      const room = rooms[params.room]

      if (room != null) {
        const player = new Player(body.player.id, body.player.name)

        room.addGuest(player)

        res.send({
          room,
        })
      } else {
        res.send({
          action: ACTIONS.ROOM_NOT_FOUND,
        } as API.Room.GetResponse)
      }
    },
  )
}
