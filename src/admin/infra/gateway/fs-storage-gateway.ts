import fs from 'fs';
import path from 'path';
import { StorageGateway } from '@admin/domain/gateway/storage';

const TMP_PATH = path.resolve(__dirname, '..', '..', '..', '..', 'tmp');

export class FSStorageGateway implements StorageGateway {
  constructor() {
    fs.mkdirSync(TMP_PATH, { recursive: true });
  }

  async upload(name: string, buffer: Buffer): Promise<string> {
    const key = path.join(TMP_PATH, name);
    await fs.promises.writeFile(key, buffer);
    return key;
  }

  async hasKey(key: string): Promise<boolean> {
    return fs.existsSync(path.resolve(TMP_PATH, key));
  }
}
