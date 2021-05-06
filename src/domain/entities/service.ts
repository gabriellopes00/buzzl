export interface Service {
  id: string
  name: string
  description?: string
  maintainer: string // user id
  isActive: boolean
  apiKey: string
}
