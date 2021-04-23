export interface Encrypter {
  encrypt(payload: string): Promise<string>
}
