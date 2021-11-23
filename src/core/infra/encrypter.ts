/**
 * Encrypter is responsible by generating(encrypting) and decrypting access tokens.
 * Accounts payloads will be encrypted in a single token, and it will be decrypted
 * to validate the user authenticity.
 */
export interface Encrypter {
  encrypt(payload: Object): Promise<string>
  decrypt<T = Object>(token: string): Promise<T>
}
