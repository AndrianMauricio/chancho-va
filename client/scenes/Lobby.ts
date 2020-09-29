import { Room } from "../../shared"

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

    const pageTitle = `Sala de ${data.room.players[data.room.admin].name}`

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
  }
}
