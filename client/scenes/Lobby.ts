export class Lobby extends Phaser.Scene {
  constructor() {
    super({
      key: "Lobby",
    })
  }

  create() {
    const { width, height } = this.sys.canvas

    this.add.text(width / 2, height / 2, "Lobby")
  }
}
