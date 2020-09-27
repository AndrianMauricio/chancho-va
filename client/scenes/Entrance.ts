import io from "socket.io-client/dist/socket.io"

export const EntranceKey = "Entrance" as const

export class Entrance extends Phaser.Scene {
  socket: SocketIOClient.Socket

  constructor() {
    super({
      key: EntranceKey,
    })
  }

  create() {
    this.socket = io()

    const { width, height } = this.sys.canvas

    this.add.text(width / 2, height / 2, "Entrance")
  }
}
