import { API } from "../../../shared"

export async function put(
  roomID: string,
  socketID: string,
  playerName: string,
  onSuccess: (result: API.Room.PostResponse) => void,
  onError: (error: unknown) => void = console.error,
) {
  try {
    const res = await window.fetch(`/api/room/${roomID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: {
          id: socketID,
          name: playerName,
        },
      } as API.Room.PostRequest),
    })

    const result = (await res.json()) as API.Room.PostResponse

    onSuccess(result)
  } catch (error) {
    onError(error)
  }
}
