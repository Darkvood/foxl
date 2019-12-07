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
      console.error("[FoxlDB] Can't init storage", e);
    }
  }

  get<T>(key: string): T | undefined {
    return this.$provider.get<T>(key);
  }

  set<T>(key: string, value: T): boolean {
    return this.$provider.set(key, value);
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
    return this.$provider.update<T>(path, reducer);
  }

  getState<T>(): T {
    return this.$provider.getState<T>();
  }

  setState<T>(newState: T): boolean {
    return this.$provider.setState<T>(newState);
  }

  private save() {
    if (this.params.save !== true) return;

    try {
      this.$provider.save();
    } catch (e) {
      console.error("[FoxlDB] Can't init storage", e);
    }
  }
}
