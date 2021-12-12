export interface StorageGateway {
  hasKey(key: string): Promise<boolean>;
  upload(name: string, buffer: Buffer): Promise<string>;
}
