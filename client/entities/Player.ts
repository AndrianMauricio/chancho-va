import cuid from "cuid"
import { SharedPlayer } from "../../shared"

export class Player extends SharedPlayer {
  constructor(data: { id: string; name: string; isAdmin: boolean }) {
    super({ ...data, sessionID: getSessionID() })
  }
}

/**
 * Set the session ID to the local storage of the browser
 */
function getSessionID() {
  const SESSION_ID = "session_id" as const

  let sessionID = window.localStorage.getItem(SESSION_ID)

  if (sessionID == null) {
    sessionID = cuid()

    window.localStorage.setItem(SESSION_ID, sessionID)
  }

  return sessionID
}
