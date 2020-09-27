import Phaser from "phaser"

import { Init, Lobby, Game, Entrance } from "./scenes"

export const config: Phaser.Types.Core.GameConfig = {
  parent: "game",
  scene: [Init, Entrance, Lobby, Game],
}

const game = new Phaser.Game(config)
