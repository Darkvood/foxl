import { FileProvider } from "./providers/fileProvider";
import debounce from "lodash.debounce";

export interface IStorage {
  init(): void;
  get<T>(path: string): T | undefined;
  set<T>(path: string, value: T): boolean;
  for<T>(path: string): FoxlModel<T>;
  update<T>(path: string, reducer: FoxlModelReducer<T>): boolean;
  getState<T>(): T;
  setState<T>(newState: T): boolean;
}

export interface IStorageProvider extends Omit<IStorage, "for"> {
  save(): void;
}

export interface StorageParams {
  path: string;
  save: boolean;
  seed: any;
}

export type FoxlModelReducer<T> = (el: T | undefined) => any;

export interface FoxlModel<T> {
  get(): T | undefined;
  set(value: T): boolean;
  update(reducer: FoxlModelReducer<T>): boolean;
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

  for<T>(path: string): FoxlModel<T> {
    let $f: FoxlModel<T> = {
      get: () => this.get(path),
      set: (value: T) => this.set(path, value),
      update: (reducer: FoxlModelReducer<T>) => this.update(path, reducer)
    };

    return $f;
  }

  update<T>(path: string, reducer: FoxlModelReducer<T>): boolean {
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
