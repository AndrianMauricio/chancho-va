import { createID } from "../server/helpers"
import { SharedPlayer } from "./Player"

export class RoomInServer {
  id: string
  admin: string
  guests: string[]
  players: Record<string, SharedPlayer>

  constructor(admin: SharedPlayer) {
    this.id = createID()
    this.admin = admin.id
    this.guests = []
    this.players = {
      [admin.id]: admin,
    }
  }

  addGuest(player: SharedPlayer) {
    this.guests.push(player.id)
    this.players[player.id] = player
  }
}
