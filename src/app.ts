import { isObject } from "./libs/utils";
import { AppStorage } from "./storage/appStorage";
import { AppParams } from "../types/app";
import { IStorage, ProviderFactory } from "../types/storage";

export function createApp(provider: ProviderFactory, { path, save = true, seed = {} }: AppParams): IStorage {
  if (!path && typeof path !== "string") {
    throw new Error(`[FoxlDB] The params "path" must be non-empty string`);
  }

  if (typeof save !== "boolean") {
    throw new Error(`[FoxlDB] The params "save" must be boolean`);
  }

  if (!isObject(seed)) {
    throw new Error(`[FoxlDB] The params "seed" must be plain object`);
  }

  return new AppStorage(provider, { path, save, seed });
}
