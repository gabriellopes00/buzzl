export interface Encrypter {
  encrypt(payload: Object): Promise<string>
  decrypt(token: string): Promise<Object>
}
