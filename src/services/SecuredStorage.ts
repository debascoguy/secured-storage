import { AES, enc } from 'crypto-ts';

export class SecuredStorage implements Storage {
  private data: any = {};
  private secret_key: string = "!!aabb@debascoguy@2020!!";
  private storeName = "store_";
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public get length(): number {
    return this.data.length;
  }

  clear(): void {
    this.storage.clear();
    this.data = {};
  }

  getItem(key: string, encryptKey: string = this.secret_key): string | null {
    let data = this.storage.getItem(this.storeName);
    if (!data) {
      return null;
    }
    let store = JSON.parse(data);
    return !!store && !!store[key]
      ? this.decrypt(store[key], encryptKey)
      : null;
  }

  key(index: number): string | null {
    let data = this.storage.getItem(this.storeName);
    if (!data) {
      return null;
    }
    let store = JSON.parse(data);
    let keys = Object.keys(store);
    return !!keys && !!keys[index] ? keys[index] : null;
  }

  removeItem(key: string): void {
    let data = this.storage.getItem(this.storeName);
    if (!data) {
      return;
    }
    let store = JSON.parse(data);
    if (!!store && !!store[key]) {
      delete store[key];
    }
    this.storage.setItem(this.storeName, JSON.stringify(store));
  }

  setItem(
    key: string,
    value: string,
    encryptKey: string = this.secret_key
  ): void {
    const data = this.storage.getItem(this.storeName);
    const store = !!data ? JSON.parse(data) : {};
    store[key] = this.encrypt(value, encryptKey);
    this.storage.setItem(this.storeName, JSON.stringify(store));
  }

  encrypt(value: any, key: string = this.secret_key): string {
    let data = typeof value == "object" ? JSON.stringify(value) : value;
    const encryptedMessage = AES.encrypt(data, key).toString();
    return encryptedMessage;
  }

  decrypt(value: any, key: string = this.secret_key): any {
    let bytes = AES.decrypt(value.toString(), key);
    let plaintext = bytes.toString(enc.Utf8);
    return plaintext;
  }
}
