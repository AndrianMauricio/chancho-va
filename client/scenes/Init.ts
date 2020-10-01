import { Room } from "../helpers/Room"
import { EntranceInit, EntranceKey } from "./Entrance"
import Phaser from "phaser"

export const InitKey = "Init" as const

export class Init extends Phaser.Scene {
  constructor() {
    super({
      key: InitKey,
    })
  }

  init() {
    Room.getRoomFromURL().then(result => {
      this.scene.start(EntranceKey, result as EntranceInit)
    })
  }
}
