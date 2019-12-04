import { FileProvider } from "./fileProvider";

export interface IStorage {
  init(): Promise<void>;
  get<T>(key: string): Promise<T | undefined>;
  set(key: string, value: any): Promise<boolean>;
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

  async init(): Promise<void> {
    try {
      await this.$provider.init();
    } catch (e) {
      console.error("[FoxlFileStorage] Can't init storage");
      console.error(e);
    }
  }

  async get<T>(key: string): Promise<T | undefined> {
    return await this.$provider.get<T>(key);
  }

  async set(key: string, value: any): Promise<boolean> {
    return await this.$provider.set(key, value);
  }
}
