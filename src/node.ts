import { FoxlDB } from "./app";
import { NodeProvider } from "./storage/providers/nodeProvider";
import { FoxlDBInstance, AppParams } from "../types/app";

export function createStorage(params: AppParams): FoxlDBInstance {
  return new FoxlDB(NodeProvider, params);
}
