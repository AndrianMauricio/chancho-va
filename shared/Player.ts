export class SharedPlayer {
  /**
   * Player identifier
   */
  id: string

  /**
   * Player's name
   */
  name: string

  /**
   * Is the player administrator fo the room?
   */
  isAdmin: boolean

  /**
   * Session ID of the player
   */
  sessionID: string

  constructor(data: {
    id: string
    name: string
    isAdmin: boolean
    sessionID: string
  }) {
    this.id = data.id
    this.name = data.name
    this.isAdmin = data.isAdmin
    this.sessionID = data.sessionID
  }

  /**
   * Set the player as administrator of the room
   */
  setAdmin() {
    this.isAdmin = true
  }
}
