import { parseNextState } from "../../core/utils";
import { IState } from "../appStorage";

export class BaseProvider {
  protected state: IState = {};

  constructor() {}

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
