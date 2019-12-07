import { isObject } from "./libs/utils";
import { AppStorage } from "./storage/appStorage";
import { FoxlDBInstance, AppParams } from "../types/app";
import { IStorage, ProviderFactory, FoxlModel, FoxlModelReducer, FoxlWatchHandler } from "../types/storage";

export class FoxlDB implements FoxlDBInstance {
  private $store: IStorage;
  version: string = FOXL_VERSION;

  constructor(provider: ProviderFactory, { path, save = true, seed = {} }: AppParams) {
    if (!path && typeof path !== "string") {
      throw new Error(`[FoxlDB] The params "path" must be non-empty string`);
    }

    if (typeof save !== "boolean") {
      throw new Error(`[FoxlDB] The params "save" must be boolean`);
    }

    if (!isObject(seed)) {
      throw new Error(`[FoxlDB] The params "seed" must be plain object`);
    }

    this.$store = new AppStorage(provider, { path, save, seed });
  }

  get<T>(key: string): T | undefined {
    return this.$store.get<T>(key);
  }

  set<T>(key: string, value: T): boolean {
    return this.$store.set<T>(key, value);
  }

  watch(path: string, handler: FoxlWatchHandler): void {
    return this.$store.watch(path, handler);
  }

  for<T>(path: string): FoxlModel<T> {
    return this.$store.for<T>(path);
  }

  update<T>(path: string, reducer: FoxlModelReducer<T>): boolean {
    return this.$store.update<T>(path, reducer);
  }

  getState<T>(): T {
    return this.$store.getState<T>();
  }

  setState<T>(newState: T): boolean {
    return this.$store.setState<T>(newState);
  }
}
