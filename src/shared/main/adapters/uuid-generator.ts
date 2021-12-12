import { randomUUID } from 'crypto';
import { UniqueIdGenerator } from '../../app/contracts/unique-id-generator';

export class UUIDGenerator implements UniqueIdGenerator {
  generate() {
    return randomUUID();
  }
}
