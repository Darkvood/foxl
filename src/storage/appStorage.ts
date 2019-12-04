import { FileProvider } from "./fileProvider";
import debounce from "lodash.debounce";

export interface IStorage {
  init(): void;
  get<T>(path: string): T | undefined;
  set<T>(path: string, value: T): boolean;
}

export interface IStorageProvider extends IStorage {
  save(): void;
}

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
  debouncedSave: () => void;

  constructor(private params: StorageParams) {
    this.$provider = new FileProvider(params.path, params.seed);

    this.debouncedSave = debounce(() => this.save(), 2000);

    this.init();
  }

  init(): void {
    try {
      this.$provider.init();
    } catch (e) {
      console.error("[FoxlDB] Can't init storage");
      console.error(e);
    }
  }

  get<T>(key: string): T | undefined {
    return this.$provider.get<T>(key);
  }

  set<T>(key: string, value: T): boolean {
    const result = this.$provider.set(key, value);

    if (this.params.save === true) {
      this.debouncedSave();
    }

    return result;
  }

  private save() {
    try {
      this.$provider.save();
    } catch (e) {
      console.error("[FoxlDB] Can't init storage");
      console.error(e);
    }
  }
}
