export const GameKey = "Game" as const
export class Game extends Phaser.Scene {
  constructor() {
    super({
      key: GameKey,
    })
  }

  create() {
    const { width, height } = this.sys.canvas

    this.add.text(width / 2, height / 2, "Game")
  }
}
