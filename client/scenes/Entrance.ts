import io from "socket.io-client/dist/socket.io"

export class Entrance extends Phaser.Scene {
  socket: SocketIOClient.Socket

  constructor() {
    super({
      key: "Entrance",
    })
  }

  create() {
    this.socket = io()

    const { width, height } = this.sys.canvas

    this.add.text(width / 2, height / 2, "Entrance")
  }
}
