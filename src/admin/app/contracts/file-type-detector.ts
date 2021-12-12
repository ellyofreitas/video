import { Readable } from 'stream';

export interface FileTypeDetector {
  detect(
    input: Buffer | Readable
  ): Promise<{ extension: string; mimeType: string }>;
}
