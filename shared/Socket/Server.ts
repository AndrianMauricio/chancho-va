import { SharedPlayer } from "../Player"
import { RoomInServer } from "../Room"

export type NewPlayerEmit = {
  playerName: string
}

export type PlayerReturnedEmit = {
  // player: SharedPlayer
  room: RoomInServer
}
