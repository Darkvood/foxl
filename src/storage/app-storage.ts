import debounce from "lodash.debounce";
import { BaseProvider } from "./providers/base-provider";
import {
  IStorage,
  IStorageProvider,
  StorageParams,
  ProviderFactory,
  FoxlModel,
  FoxlModelReducer,
  FoxlWatchHandler
} from "../../types/storage";

export class AppStorage implements IStorage {
  $provider: IStorageProvider;
  debouncedSave: () => void;

  constructor(provider: ProviderFactory, private params: StorageParams) {
    this.$provider = BaseProvider.create(provider, params.path, params.seed);

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

  set<T>(key: string, value: T): T | undefined {
    const status = this.$provider.set(key, value);
    this.debouncedSave();
    return status;
  }

  watch(path: string, handler: FoxlWatchHandler): void {
    this.$provider.watch(path, handler);
  }

  for<T>(path: string): FoxlModel<T> {
    let $f: FoxlModel<T> = {
      get: () => this.get(path),
      set: (value: T) => this.set(path, value),
      update: (reducer: FoxlModelReducer<T>) => this.update(path, reducer),
      watch: (handler: FoxlWatchHandler) => this.watch(path, handler)
    };

    return $f;
  }

  update<T>(path: string, reducer: FoxlModelReducer<T>): T | undefined {
    const status = this.$provider.update<T>(path, reducer);
    this.debouncedSave();
    return status;
  }

  getState<T>(): T {
    return this.$provider.getState<T>();
  }

  setState<T>(newState: T): T | undefined {
    const status = this.$provider.setState<T>(newState);
    this.debouncedSave();
    return status;
  }

  private save() {
    if (this.params.save !== true) return;

    try {
      this.$provider.save();
    } catch (e) {
      console.error("[FoxlDB] Can't save storage", e);
    }
  }
}
