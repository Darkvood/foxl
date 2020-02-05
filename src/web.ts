import { App } from "./app";
import { WebProvider } from "./storage/providers/webProvider";
import { AppParams } from "../types/app";
import { IStorage } from "../types/storage";

export function createStorage(params: AppParams): IStorage {
  return App.createStorage(WebProvider, params);
}
