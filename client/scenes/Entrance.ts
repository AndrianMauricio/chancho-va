import io from "socket.io-client"
import { assets } from "../assets"
import { Room } from "../helpers/Room"
import { LobbyInit, LobbyKey } from "./Lobby"

export const EntranceKey = "Entrance" as const

export type EntranceInit = {
  error: boolean
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

    if (error) {
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

      if (this.room != null) {
        this.room.joinRoom(this.socket.id, inputName.value).then(room => {
          if (room == null) {
            console.error(
              "Por alguna extraña razón room está indefinido o es falso.",
            )
            return
          }

          this.goToLobby(room)
        })
      } else {
        Room.createRoom(this.socket.id, inputName.value).then(room => {
          if (room == null) {
            console.error("Por alguna extraña razón room está indefinido.")
            return
          }

          this.goToLobby(room)
        })
      }
    })
  }

  goToLobby(room: Room) {
    this.scene.start(LobbyKey, {
      room,
      socket: this.socket,
    } as LobbyInit)
  }
}
