import io from "socket.io-client"
import { API, Room } from "../../shared"
import { apis } from "../apis"
import { assets } from "../assets"
import { LobbyInit, LobbyKey } from "./Lobby"

export const EntranceKey = "Entrance" as const

export type EntranceInit = {
  error?: boolean
  room?: Room
}

export class Entrance extends Phaser.Scene {
  actionText: string
  socket: SocketIOClient.Socket
  room?: Room

  constructor() {
    super({ key: EntranceKey })
  }

  preload() {
    this.load.html(assets.NAME_FORM.key, assets.NAME_FORM.src())
  }

  init({ room, error }: EntranceInit) {
    this.room = room

    const { width, height } = this.sys.canvas

    if (error != null && error) {
      this.add
        .text(width / 2, height / 2 - 200, "No se encontró la sala")
        .setOrigin(0.5, 0.5)
        .setColor("red")
    }

    this.actionText =
      room == null
        ? "Crear sala"
        : `Unirse a la sala de ${room.players[room.admin].name}`

    this.socket = io()
  }

  create() {
    const { width, height } = this.sys.canvas

    const html = this.add
      .dom(width / 2, height / 2)
      .createFromCache(assets.NAME_FORM.key)

    const form = html.getChildByID("name-form") as HTMLFormElement
    const actionButton = html.getChildByID("action-button") as HTMLButtonElement
    const inputName = html.getChildByID("input-name") as HTMLInputElement

    actionButton.innerText = this.actionText

    form.addEventListener("submit", e => {
      e.preventDefault()

      if (inputName.value == null || inputName.value === "") return

      const onSuccess = (result: API.Room.PostResponse) => {
        this.scene.start(LobbyKey, {
          room: result.room,
          socket: this.socket,
        } as LobbyInit)
      }

      if (this.room != null) {
        apis.room.put(this.room.id, this.socket.id, inputName.value, onSuccess)
      } else {
        apis.room.post(this.socket.id, inputName.value, onSuccess)
      }
    })
  }
}
