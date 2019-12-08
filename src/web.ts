import { FoxlDB } from "./app";
import { WebProvider } from "./storage/providers/webProvider";
import { FoxlDBInstance, AppParams } from "../types/app";

export function createStorage(params: AppParams): FoxlDBInstance {
  return new FoxlDB(WebProvider, params);
}
