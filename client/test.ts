export class Test extends Phaser.Scene {
  colors = [0x0000ff, 0x00ff00, 0x00ffff, 0xff0000, 0xff00ff, 0xffff00]

  constructor() {
    super({ key: "Test" })
  }

  preload() {}

  init() {}

  create() {
    const { width, height } = this.sys.canvas
    const centerX = width / 2
    const centerY = height / 2

    const radius = 50
    const offset = radius + radius / 2
    const diameter = radius * 2
    const separation = diameter + radius

    for (let i = -1; i <= 2; i++) {
      this.add
        .circle(
          centerX + separation * i - offset,
          centerY,
          radius,
          this.getColor(),
        )
        .setStrokeStyle(4, 0xffffff)
    }

    // this.add
    //   .line(0, centerY, centerX, 0, centerX, height, 0x00ff00)
    //   .setStrokeStyle(4, 0xffffff)
    // const circle = this.add
    //   .circle(centerX, centerY, 50, 0xffff00)
    //   .setStrokeStyle(4, 0xff0000)
  }

  update() {}

  getColor() {
    return this.colors[Phaser.Math.Between(0, this.colors.length - 1)]
  }
}
