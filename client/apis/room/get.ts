import { API } from "../../../shared"

export async function get(
  roomID: string,
  onSuccess: (result: API.Room.GetResponse) => void,
  onError: (error: unknown) => void = console.error,
) {
  try {
    const res = await window.fetch(`/api/room/${roomID}`)

    const result = (await res.json()) as API.Room.GetResponse

    onSuccess(result)
  } catch (error) {
    onError(error)
  }
}
