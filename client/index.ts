import Phaser from "phaser"

import { Init, Lobby, Game, Entrance } from "./scenes"

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  scene: [Init, Entrance, Lobby, Game],
  dom: {
    createContainer: true,
  },
}

const game = new Phaser.Game(config)
