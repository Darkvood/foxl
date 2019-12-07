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

export type FoxlModelReducer<T> = (el: T | undefined) => any;

export interface FoxlModel<T> {
  get(): T | undefined;
  set(value: T): boolean;
  update(reducer: FoxlModelReducer<T>): boolean;
}

export interface IState {
  [key: string]: any;
}
