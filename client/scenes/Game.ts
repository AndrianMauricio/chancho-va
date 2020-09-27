export class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    })
  }

  create() {
    const { width, height } = this.sys.canvas

    this.add.text(width / 2, height / 2, "Game")
  }
}
