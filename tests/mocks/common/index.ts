import { Validator } from '@/presentation/ports/validator'
import { APIKeyGenerator } from '@/usecases/ports/api-key-generator'
import { Encrypter } from '@/usecases/ports/encrypter'
import { Hasher } from '@/usecases/ports/hasher'
import { UUIDGenerator } from '@/usecases/ports/uuid-generator'
import { fakeUser } from '../user/user'

export class MockAPIKeyGenerator implements APIKeyGenerator {
  generate(): string {
    return '_cbvTX7PjT15'
  }
}

export class MockEncrypter implements Encrypter {
  async encrypt(payload: string): Promise<string> {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  }

  async decrypt(token: string): Promise<Object> {
    return { id: fakeUser.id }
  }
}

export class MockUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return '55bc05b5-118c-4fa9-8b92-163348ea85ce'
  }
}

export class MockValidator implements Validator {
  validate(input: any): Error {
    return null
  }
}

export class MockHasher implements Hasher {
  async generate(password: string): Promise<string> {
    return 'E1F88AD57CD9C593E883C7665204D2D26BFE83317D8C97B737303AB855C970C9'
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return true
  }
}
