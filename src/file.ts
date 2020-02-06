import { App } from "./app";
import { FileProvider } from "./storage/providers/file-provider";
import { AppParams } from "../types/app";
import { IStorage } from "../types/storage";

export function createStorage(params: AppParams): IStorage {
  return App.createStorage(FileProvider, params);
}
