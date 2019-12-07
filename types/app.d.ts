import { FoxlModel, FoxlModelReducer, FoxlWatchHandler } from "./storage";

export interface AppParams {
  path: string;
  save?: boolean;
  seed?: any;
}

export interface ParsedAppParams extends Required<AppParams> {}

export interface FoxlDBInstance {
  version: string;

  get<T>(path: string): T | undefined;
  set<T>(path: string, value: T): boolean;
  watch(path: string, handler: FoxlWatchHandler): void;
  for<T>(path: string): FoxlModel<T>;
  update<T>(path: string, reducer: FoxlModelReducer<T>): boolean;
  getState<T>(): T;
  setState<T>(newState: T): boolean;
}
