export interface Encrypter {
  encrypt(payload: Object): Promise<string>
}
