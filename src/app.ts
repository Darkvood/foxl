import { isObject } from "./core/utils";
import { AppStorage, IStorage, FoxlModel, FoxlModelReducer } from "./storage/appStorage";
import { ProviderFactory } from "./storage/providers/baseProvider";

export class FoxlDB {
  $store: IStorage;
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
    return this.$store.get(key);
  }

  set<T>(key: string, value: T): boolean {
    return this.$store.set(key, value);
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
