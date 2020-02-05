import { ParsedAppParams } from "./app";

export interface ProviderFactory {
  new (path: string, seed: any): IStorageProvider;
}

export interface IStorage {
  get<T>(path: string): T | undefined;
  set<T>(path: string, value: T): boolean;
  watch(path: string, handler: FoxlWatchHandler): void;
  for<T>(path: string): FoxlModel<T>;
  update<T>(path: string, reducer: FoxlModelReducer<T>): boolean;
  getState<T>(): T;
  setState<T>(newState: T): boolean;
}

export interface IStorageProvider extends Omit<IStorage, "for"> {
  init(): void;
  save(): void;
}

export interface StorageParams extends ParsedAppParams {}

// Watch
export type FoxlWatchHandler = (nextValue: any, prevValue: any) => void;
export type FoxlWatchersList = Map<string, FoxlWatchHandler>;
export type ChangeEmmiter = (path: string, nextValue: any, prevValue: any) => void;

export type FoxlModelReducer<T> = (el: T | undefined) => any;

export interface FoxlModel<T> {
  get(): T | undefined;
  set(value: T): boolean;
  update(reducer: FoxlModelReducer<T>): boolean;
  watch(handler: FoxlWatchHandler): void;
}

export interface IState {
  [key: string]: any;
}
