import setValue from "set-value";
import { ChangeEmmiter } from "../../types/storage";

const noDefault = Symbol("safeGet.def");

export function isObject(value: any) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function safeGet(obj: any, path: string, defaultValue = noDefault) {
  const result = path.split(".").reduce((acc, curr) => (acc && typeof acc === "object" ? acc[curr] : null), obj);
  const hasDefault = defaultValue !== noDefault;

  if (result === undefined && hasDefault) {
    return defaultValue;
  } else {
    return result;
  }
}

export function parentIsMutable(obj: any, path: string): boolean {
  const splitedPath = path.split(".");

  // if root
  if (splitedPath.length === 1) return true;

  splitedPath.length -= 1;

  const parent = safeGet(obj, splitedPath.join("."));

  return isObject(parent);
}

export function commitChanges(state: any, path: string, value: any, changeEmitter: ChangeEmmiter): boolean {
  if (!path) return false;

  if (Array.isArray(value)) {
    value = [...value];
  }

  if (isObject(value)) {
    value = { ...value };
  }

  const prevValue = safeGet(state, path);

  setValue(state, path, value);

  changeEmitter(path, value, prevValue);

  return true;
}

export function parseNextState(newState: any) {
  if (!isObject(newState)) return false;

  return { ...newState };
}
