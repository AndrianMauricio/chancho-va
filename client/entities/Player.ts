import cuid from "cuid"
import { SharedPlayer } from "../../shared"

export class Player extends SharedPlayer {
  constructor(data: { id: string; name: string; isAdmin: boolean }) {
    super(data)
  }

  /**
   * Asks for the "player_id" stored in the browser.
   *
   * If present, it returns it.
   *
   * If not, it generates a new one, stores, and returns it.
   */
  static get sessionID() {
    const PLAYER_ID = "player_id" as const

    let sessionID = window.localStorage.getItem(PLAYER_ID)

    if (sessionID == null) {
      sessionID = cuid()

      window.localStorage.setItem(PLAYER_ID, sessionID)
    }

    return sessionID
  }
}
