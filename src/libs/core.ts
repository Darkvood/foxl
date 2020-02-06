import setValue from "set-value";
import { ChangeEmmiter } from "../../types/storage";
import { safeGet, isObject } from "./utils";

export function parentIsMutable(obj: any, path: string): boolean {
  const splitedPath = path.split(".");

  // if root
  if (splitedPath.length === 1) return true;

  splitedPath.length -= 1;

  const parent = safeGet(obj, splitedPath.join("."));

  return isObject(parent);
}

export function commitChanges<T>(state: any, path: string, value: any, changeEmitter: ChangeEmmiter): T | undefined {
  if (!path) return undefined;

  if (Array.isArray(value)) {
    value = [...value];
  } else if (isObject(value)) {
    value = { ...value };
  }

  const prevValue = safeGet(state, path);

  setValue(state, path, value);

  changeEmitter(path, value, prevValue);

  return value;
}

export function parseNextState(newState: any) {
  if (!isObject(newState)) return false;

  return { ...newState };
}
