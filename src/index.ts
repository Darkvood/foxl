import { FoxlDB } from "./app";
import { FileProvider } from "./storage/providers/fileProvider";
import { FoxlDBInstance, AppParams } from "../types/app";

export function createStorage(params: AppParams): FoxlDBInstance {
  return new FoxlDB(FileProvider, params);
}
