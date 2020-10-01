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

  constructor(data: { id: string; name: string; isAdmin: boolean }) {
    this.id = data.id
    this.name = data.name
    this.isAdmin = data.isAdmin
  }

  /**
   * Set the player as administrator of the room
   */
  setAdmin() {
    this.isAdmin = true
  }
}
