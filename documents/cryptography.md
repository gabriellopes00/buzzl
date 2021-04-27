# Hashes (argon2, scrypt, bcrypt)

Hash can be any algorithm which map some any data to a set of alphanumeric with fixed size. This can be used for many things from the faster data analysis, authenticity verification, information integrity... to the safe transport and storage of sensitive data. Hash functions are know as _on-way functions_, once the data hashed cannot be converted back from a hash string. However a hash can be compared with the original data. From the same data or string, can be generated many different hashes, but a hash combination cannot be generated from different inputs (this fact is know as collision).

- Fixed size output: Independent of the input value and length, the resultant hash always will have the same length.
- Irreversible.
- Operation efficiency: Hash process cannot compromise processing speed.
- The slightest change in the input value, make the final hash change completely.
- Algorithms: SHA256, MD5, SHA512, SHA-1...

*https://medium.com/analytics-vidhya/password-hashing-pbkdf2-scrypt-bcrypt-and-argon2-e25aaf41598e*

# Algorithm

Logical sequence used to execute any task, such as generate a hash or encrypt some data.

- side-channel attacks
- GPU cracking attacks

- cryptography
- keys pair
- ssh
- jwt
