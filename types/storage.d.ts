import { ParsedAppParams, FoxlDBInstance } from "./app";

export interface ProviderFactory {
  new (path: string, seed: any): IStorageProvider;
}

export interface IStorage extends Omit<FoxlDBInstance, "version"> {
  init(): void;
}

export interface IStorageProvider extends Omit<IStorage, "for"> {
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
