import { safeGet, parentIsMutable, parseNextState, commitChanges } from "../../core/utils";
import { IState, FoxlRowReducer } from "../appStorage";

export class BaseProvider {
  protected state: IState = {};

  constructor() {}

  get<T>(path: string): T | undefined {
    return safeGet(this.state, path);
  }

  set<T>(path: string, value: T): boolean {
    if (parentIsMutable(this.state, path)) {
      return commitChanges(this.state, path, value);
    }
    return false;
  }

  update<T>(path: string, reducer: FoxlRowReducer<T>): boolean {
    if (!parentIsMutable(this.state, path)) return false;

    const currentValue = this.get(path);
    const nextValue = reducer(currentValue as T);

    return this.set(path, nextValue);
  }

  getState<T>(): T {
    return this.state as T;
  }

  setState<T>(newState: T) {
    const state = parseNextState(newState);

    if (!state) return false;

    this.state = state as IState;

    return true;
  }
}
