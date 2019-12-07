import { FoxlModel, FoxlModelReducer } from "./storage";

export interface AppParams {
  path: string;
  save?: boolean;
  seed?: any;
}

export interface ParsedAppParams extends AppParams {
  save: boolean;
  seed: any;
}

export interface FoxlDBInstance {
  version: string;

  get<T>(path: string): T | undefined;
  set<T>(path: string, value: T): boolean;
  for<T>(path: string): FoxlModel<T>;
  update<T>(path: string, reducer: FoxlModelReducer<T>): boolean;
  getState<T>(): T;
  setState<T>(newState: T): boolean;
}
