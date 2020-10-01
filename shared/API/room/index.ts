import { RoomInServer } from "../../Room"

export type GetResponse = {
  room?: RoomInServer
}

export type GetParams = { room: string }

export type PutParams = { room: string }

export type PostRequest = {
  player: {
    id: string
    name: string
    sessionID: string
  }
}

export type PutRequest = {
  player: {
    id: string
    name: string
    sessionID: string
  }
}

export type PostResponse = {
  room: RoomInServer
}

export type PutResponse = {
  room: RoomInServer
}
