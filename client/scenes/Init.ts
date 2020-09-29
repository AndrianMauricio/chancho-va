import { ACTIONS } from "../../shared"
import { apis } from "../apis"
import { EntranceInit, EntranceKey } from "./Entrance"

export const InitKey = "Init" as const

export class Init extends Phaser.Scene {
  constructor() {
    super({
      key: InitKey,
    })
  }

  init() {
    const { pathname } = window.location

    if (pathname === "/" || pathname === "") {
      this.scene.start(EntranceKey, { room: undefined } as EntranceInit)
    } else {
      const paths = pathname.split("/")
      const roomPath = paths[1]
      const roomID = paths[2]

      const isValidRoomPathname = roomPath === "room"
      const isValidRoomName = roomID != null && roomID.length > 0
      const isValidRoomPath = isValidRoomPathname && isValidRoomName

      if (isValidRoomPath) {
        apis.room.get(roomID, ({ room }) => {
          this.scene.start(EntranceKey, {
            room,
            error: room == null,
          } as EntranceInit)
        })
      } else {
        window.location.replace("/")
      }
    }
  }
}
