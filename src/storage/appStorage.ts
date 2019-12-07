import debounce from "lodash.debounce";
import { BaseProvider } from "./providers/baseProvider";
import {
  IStorage,
  IStorageProvider,
  StorageParams,
  ProviderFactory,
  FoxlModel,
  FoxlModelReducer
} from "../../types/storage";

export class AppStorage implements IStorage {
  $provider: IStorageProvider;
  debouncedSave: () => void;

  constructor(provider: ProviderFactory, private params: StorageParams) {
    this.$provider = BaseProvider.factory(provider, params.path, params.seed);

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
