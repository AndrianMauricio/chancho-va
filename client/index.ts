import Phaser from "phaser"

import { Init, Lobby, Game, Entrance } from "./scenes"
// import { Test } from "./test"

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  scene: [Init, Entrance, Lobby, Game],
  // scene: [Test],
  dom: {
    createContainer: true,
  },
}

const game = new Phaser.Game(config)
