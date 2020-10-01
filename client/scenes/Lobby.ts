import { Socket } from "../../shared"
import { Room } from "../helpers/Room"
import Phaser from "phaser"

export const LobbyKey = "Lobby" as const
export type LobbyInit = {
  room: Room
  socket: SocketIOClient.Socket
}

export class Lobby extends Phaser.Scene {
  socket: SocketIOClient.Socket
  room: Room

  constructor() {
    super({
      key: LobbyKey,
    })
  }

  init(data: LobbyInit) {
    this.room = data.room
    this.socket = data.socket

    const pageTitle = `Sala de ${data.room.players[data.room.adminID].name}`

    window.history.replaceState(
      undefined,
      pageTitle,
      `${window.location.origin}/room/${data.room.id}`,
    )

    document.title = pageTitle
  }

  create() {
    const { width, height } = this.sys.canvas

    this.add
      .text(width / 2, height / 2, this.room.players[this.socket.id].name)
      .setOrigin(0.5, 0.5)

    this.socket.emit("new-player", {
      player: this.room.players[this.socket.id],
      roomID: this.room.id,
    } as Socket.Client.NewPlayerEmit)

    this.socket.on(
      "new-player",
      ({ playerName }: Socket.Server.NewPlayerEmit) => {
        console.log("Se ha unido", playerName)
      },
    )
  }
}
