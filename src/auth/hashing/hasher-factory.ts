import { Hasher } from './types/hasher';
import { Argon2Hasher } from './hashing-schemes/argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HasherFactory {
  private hashers: Hasher[] = [new Argon2Hasher()];

  lastVersion = this.hashers.length - 1;

  getHasher(version: number): Hasher | undefined {
    return this.hashers[version];
  }

  getLastVersionHasher(): Hasher {
    return this.hashers[this.lastVersion];
  }

  getLastVersionNumber(): number {
    return this.lastVersion;
  }
}
