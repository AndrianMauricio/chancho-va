export class Player {
  id: string
  name: string
  isAdmin: boolean

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.isAdmin = false
  }

  setAdmin() {
    this.isAdmin = true
  }
}
