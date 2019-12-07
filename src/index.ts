import { FoxlDB } from "./app";
import { FileProvider } from "./storage/providers/fileProvider";

export function createStorage(params: AppParams) {
  return new FoxlDB(FileProvider, params);
}
