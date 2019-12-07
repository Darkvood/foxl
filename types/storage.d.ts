export interface ProviderFactory {
  new (path: string, seed: any): IStorageProvider;
}

export interface IStorage {
  init(): void;
  get<T>(path: string): T | undefined;
  set<T>(path: string, value: T): boolean;
  for<T>(path: string): FoxlModel<T>;
  update<T>(path: string, reducer: FoxlModelReducer<T>): boolean;
  getState<T>(): T;
  setState<T>(newState: T): boolean;
}

export interface IStorageProvider extends Omit<IStorage, "for"> {
  save(): void;
}

export interface StorageParams {
  path: string;
  save: boolean;
  seed: any;
}

export type FoxlModelReducer<T> = (el: T | undefined) => any;

export interface FoxlModel<T> {
  get(): T | undefined;
  set(value: T): boolean;
  update(reducer: FoxlModelReducer<T>): boolean;
}

interface IState {
  [key: string]: any;
}
