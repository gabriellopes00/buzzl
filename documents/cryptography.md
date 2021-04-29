# Hashes (argon2, scrypt, bcrypt)

Hash can be any algorithm which map some any data to a set of alphanumeric with fixed size. This can be used for many things from the faster data analysis, authenticity verification, information integrity... to the safe transport and storage of sensitive data. Hash functions are know as _on-way functions_, once the data hashed cannot be converted back from a hash string. However a hash can be compared with the original data. From the same data or string, can be generated many different hashes, but a hash combination cannot be generated from different inputs (this fact is know as collision).

- **Fixed size output**: Independent of the input value and length, the resultant hash always will have the same length.
- **Irreversible**.
- **Operation efficiency**: Hash process cannot compromise processing speed.
- The slightest change in the input value, make the final hash change completely.
- **Algorithms**: SHA256, MD5, SHA512, SHA-1...

*https://medium.com/analytics-vidhya/password-hashing-pbkdf2-scrypt-bcrypt-and-argon2-e25aaf41598e*

# Algorithm

Logical sequence used to execute any task, such as generate a hash or encrypt some data.

- side-channel attacks
- GPU cracking attacks

# Cryptography

In computer science, cryptography refers to secure information and communication techniques derived from mathematical concepts and a set of rule-based calculations called algorithms, to transform messages in ways that are hard to decipher.These deterministic algorithms are used for cryptographic key generation, digital signing, verification to protect data privacy, web browsing on the internet, and confidential communications such as credit card transactions and email.

- **Confidentiality**: the information cannot be understood by anyone for whom it was unintended
- **Integrity**: The information cannot be altered in storage or transit between sender and intended receiver without the alteration being detected
- **Authentication**: the sender and receiver can confirm each other's identity and the origin/destination of the information

#### Types

- **Symmetric cryptography**: Algorithm which creates a fixed length of bits from a data, using a single key, know by the encrypter and decrypter, to encrypt the data.

- **Asymmetric cryptography**: Algorithms which uses a pair of keys to encrypt a data; a public key associated with the creator/sender for encrypting messages and a private key is associated with the receiver of the message, that is able to revert the cryptography.

*https://searchsecurity.techtarget.com/definition/cryptography#:~:text=Cryptography%20is%20a%20method%20of,%22%20stands%20for%20%22writing.%22*

- keys pair
- ssh
- jwt

# Tools

`ssh-keygem` => key pair generator default standard is generating a RSA key with 2048 bits (`-b 4096` generates 4096 bits keys)
`ssh-copy-id username@remote_host` => copy the public key to a remote server
the command below copy the key to a remote server too

```bash
cat ~/.ssh/id_rsa.pub | ssh username@remote_host "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"

```
