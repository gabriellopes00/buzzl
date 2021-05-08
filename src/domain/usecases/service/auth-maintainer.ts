export interface AuthMaintainer {
  auth(token: string): Promise<boolean>
}
