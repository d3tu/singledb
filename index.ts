import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';

export class Database {
  [x: string]: any;
  [x: number]: any;
  private obj: any;

  constructor(public path: string) {
    if (!existsSync(path)) {
      mkdirSync(dirname(path), { recursive: true });
      this.obj = this.write = {};
    } else this.obj = this.read;

    return new Proxy(this.obj, {
      set: (target: any, key: any, value: any) => {
        Object.assign(target, this.read);
        target[key] = value;
        this.write = target;
        return true;
      },
      get: (target: any, key: any) => {
        Object.assign(target, this.read);
        return target[key];
      },
      deleteProperty: (target: any, key: any) => {
        Object.assign(target, this.read);
        const bool = delete target[key];
        this.write = target;
        return bool;
      },
    });
  }

  private get read() {
    return JSON.parse(readFileSync(this.path, 'utf-8'));
  }

  private set write(data: any) {
    writeFileSync(this.path, JSON.stringify(data, undefined, 2));
  }
}

export default Database;
