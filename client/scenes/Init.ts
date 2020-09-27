import { EntranceKey } from "./Entrance"

export const InitKey = "Init" as const

export class Init extends Phaser.Scene {
  constructor() {
    super({
      key: InitKey,
    })
  }

  create() {
    this.scene.start(EntranceKey)
  }
}
