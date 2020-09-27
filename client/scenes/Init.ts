import { Entrance } from "./Entrance"

export class Init extends Phaser.Scene {
  constructor() {
    super({
      key: "Init",
    })
  }

  create() {
    this.scene.start(Entrance.name)
  }
}
