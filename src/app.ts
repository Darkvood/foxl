import { isObject } from "./libs/utils";
import { AppStorage } from "./storage/app-storage";
import { AppParams } from "../types/app";
import { IStorage, ProviderFactory, StorageParams } from "../types/storage";

export class App {
  static createStorage(provider: ProviderFactory, params: AppParams): IStorage {
    const storageParams = App.parseAndValidateParams(params);

    return new AppStorage(provider, storageParams);
  }

  static parseAndValidateParams({ path, save = true, seed = {} }: AppParams): StorageParams | never {
    if (!path && typeof path !== "string") {
      throw new Error(`[FoxlDB] The params "path" must be non-empty string`);
    }

    if (typeof save !== "boolean") {
      throw new Error(`[FoxlDB] The params "save" must be boolean`);
    }

    if (!isObject(seed)) {
      throw new Error(`[FoxlDB] The params "seed" must be plain object`);
    }

    return { path, save, seed };
  }
}
