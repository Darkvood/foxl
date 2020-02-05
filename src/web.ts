import { createApp } from "./app";
import { WebProvider } from "./storage/providers/webProvider";
import { AppParams } from "../types/app";

export function createStorage(params: AppParams) {
  return createApp(WebProvider, params);
}
