import { createApp } from "./app";
import { NodeProvider } from "./storage/providers/nodeProvider";
import { AppParams } from "../types/app";

export function createStorage(params: AppParams) {
  return createApp(NodeProvider, params);
}
