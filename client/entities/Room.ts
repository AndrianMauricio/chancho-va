import { API } from "../../shared"
import { Player } from "./Player"

export class Room {
  /**
   * Room identifier
   */
  id: string

  /**
   * Admin player identifier
   */
  adminID: string

  /**
   * List of identifiers of the guest players
   */
  guestsIDs: string[]

  /**
   * Dictionary of all the players in the room.
   *
   * - Key: Player identifier
   *
   * - Value: Player
   */
  players: Record<string, Player>

  constructor(data: {
    id: string
    admin: string
    guests: string[]
    players: Record<string, Player>
  }) {
    this.id = data.id
    this.adminID = data.admin
    this.guestsIDs = data.guests
    this.players = data.players
  }

  /**
   * Returns a Player
   *
   * @param playerID Player identifier
   */
  getPlayer(playerID: string): Player | undefined {
    return this.players[playerID]
  }

  /**
   * Administrator of the room
   */
  get admin(): Player {
    return this.players[this.adminID]
  }

  /**
   * Asks the API to join this player into this room.
   *
   * @param playerID Socket identifier
   * @param playerName Name of the guest player
   */
  async joinRoom(
    playerID: string,
    playerName: string,
  ): Promise<Room | undefined> {
    try {
      const res = await window.fetch(`/api/room/${this.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player: {
            id: playerID,
            name: playerName,
          },
        } as API.Room.PutRequest),
      })

      if (res.status === 200) {
        const result = (await res.json()) as API.Room.PutResponse

        this.guestsIDs.push(playerID)
        this.players[playerID] = result.room.players[playerID]

        return this
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Asks the API to create a new room.
   *
   * @param adminID Socket identifier
   * @param adminName Name of the 1st player (admin of the room)
   */
  static async createRoom(
    adminID: string,
    adminName: string,
  ): Promise<Room | undefined> {
    try {
      const player = new Player({ id: adminID, name: adminName, isAdmin: true })

      const res = await window.fetch("/api/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player,
        } as API.Room.PostRequest),
      })

      const result = (await res.json()) as API.Room.PostResponse

      return new Room(result.room)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * If the user is in the root path, there would be no room to return.
   *
   * If the user is in an invalid path, it'll be redirected to root path
   * anf there would be no room to return.
   *
   * Else, a room is going to be asked to the API with the chance of no
   * room found.
   */
  static async getRoomFromURL(): Promise<{ room?: Room; error: boolean }> {
    const { pathname } = window.location

    if (pathname === "/" || pathname === "") return { error: false }

    const paths = pathname.split("/")
    const roomPath = paths[1]
    const roomID = paths[2]

    const isValidRoomPathname = roomPath === "room"
    const isValidRoomName = roomID != null && roomID.length > 0
    const isValidRoomPath = isValidRoomPathname && isValidRoomName

    if (!isValidRoomPath) {
      window.history.replaceState(
        undefined,
        "Chancho Va",
        `${window.location.origin}/`,
      )
      return { error: false }
    }

    try {
      const res = await window.fetch(`/api/room/${roomID}`)

      const result = (await res.json()) as API.Room.GetResponse

      if (result.room != null) {
        return { room: new Room(result.room), error: result.room == null }
      } else {
        return { error: result.room == null }
      }
    } catch (error) {
      console.error(error)
      return { error: false }
    }
  }
}
