import { App } from "./app";
import { NodeProvider } from "./storage/providers/node-provider";
import { AppParams } from "../types/app";
import { IStorage } from "../types/storage";

export function createStorage(params: AppParams): IStorage {
  return App.createStorage(NodeProvider, params);
}
