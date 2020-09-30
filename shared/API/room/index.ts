import { ACTIONS } from "../../constants"
import { Room } from "../../Room"

export type GetResponse = {
  room?: Room
}

export type GetParams = { room: string }
export type PutParams = { room: string }

export type PostRequest = {
  player: {
    id: string
    name: string
  }
}

export type PutRequest = {
  player: {
    id: string
    name: string
  }
}

export type PostResponse = {
  room: Room
}

export type PutResponse = {
  room: Room
}
