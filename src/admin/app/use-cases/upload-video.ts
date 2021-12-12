import { UniqueIdGenerator } from '@shared/app/contracts';
import { StorageGateway } from '@admin/domain/gateway/storage';
import { FileTypeDetector } from '../contracts/file-type-detector';

export class UploadVideo {
  constructor(
    readonly uniqueIdGenerator: UniqueIdGenerator,
    readonly storageGateway: StorageGateway,
    readonly fileTypeDetector: FileTypeDetector
  ) {}

  async perform(input) {
    const { extension } = await this.fileTypeDetector.detect(input);
    const uniqueId = this.uniqueIdGenerator.generate();
    const storageKey = [uniqueId, extension].join('.');
    await this.storageGateway.upload(storageKey, input);
    return { storageKey };
  }
}
