import { FileProvider } from "./fileProvider";

export interface IStorage {
  init(): void;
  get<T>(key: string): T | undefined;
  set(key: string, value: any): boolean;
}

export interface IStorageProvider extends IStorage {}

export interface StorageParams {
  path: string;
  save: boolean;
  seed: any;
}

export interface IState {
  [key: string]: any;
}

export class AppStorage implements IStorage {
  private $provider: IStorageProvider;

  constructor(params: StorageParams) {
    this.$provider = new FileProvider(params.path, params.seed);

    this.init();
  }

  init(): void {
    try {
      this.$provider.init();
    } catch (e) {
      console.error("[FoxlFileStorage] Can't init storage");
      console.error(e);
    }
  }

  get<T>(key: string): T | undefined {
    return this.$provider.get<T>(key);
  }

  set(key: string, value: any): boolean {
    return this.$provider.set(key, value);
  }
}
