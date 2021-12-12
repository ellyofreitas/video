import { FileTypeDetector } from '@admin/app/contracts/file-type-detector';
import { fromBuffer, fromStream, FileTypeResult } from 'file-type';
import { Readable } from 'stream';

export class FileType implements FileTypeDetector {
  async detect(
    input: Buffer | Readable
  ): Promise<{ extension: string; mimeType: string }> {
    let result: FileTypeResult;

    if (input instanceof Buffer) result = await fromBuffer(input);
    if (input instanceof Readable) result = await fromStream(input);

    if (!result) throw new Error('');
    return { extension: result.ext, mimeType: result.mime };
  }
}
