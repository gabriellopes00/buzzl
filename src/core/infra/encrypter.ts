export interface Encrypter {
  encrypt(payload: Object): Promise<string>
  decrypt<T = Object>(token: string): Promise<T>
}
