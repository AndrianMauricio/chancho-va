import { createID } from "../server/helpers"
import { Player } from "./Player"

export class Room {
  id: string
  admin: string
  guests: string[]
  players: Record<string, Player>

  constructor(admin: Player) {
    this.id = createID()
    this.admin = admin.id
    this.guests = []
    this.players = {
      [admin.id]: admin,
    }
  }

  addGuest(player: Player) {
    this.guests.push(player.id)
    this.players[player.id] = player
  }
}
