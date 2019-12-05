import { FileProvider } from "./providers/fileProvider";
import debounce from "lodash.debounce";

export interface IStorage {
  init(): void;
  get<T>(path: string): T | undefined;
  set<T>(path: string, value: T): boolean;
  update<T>(path: string, reducer: (el: T) => any): boolean;
  getState<T>(): T;
  setState<T>(newState: T): boolean;
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
    const status = this.$provider.set(key, value);

    if (this.params.save === true) {
      this.debouncedSave();
    }

    return status;
  }

  update<T>(path: string, reducer: (el: T) => any): boolean {
    const status = this.$provider.update<T>(path, reducer);

    if (this.params.save === true) {
      this.debouncedSave();
    }

    return status;
  }

  getState<T>(): T {
    return this.$provider.getState<T>();
  }

  setState<T>(newState: T): boolean {
    const status = this.$provider.setState<T>(newState);

    if (this.params.save === true) {
      this.debouncedSave();
    }

    return status;
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
