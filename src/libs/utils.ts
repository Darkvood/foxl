const noDefault = Symbol("foxldb.safeGet.def");

export function isObject(value: any) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function safeGet(obj: any, path: string, defaultValue = noDefault) {
  const result = path.split(".").reduce((acc, curr) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc) && acc.hasOwnProperty(curr)) {
      return acc[curr];
    } else {
      return undefined;
    }
  }, obj);

  const hasDefault = defaultValue !== noDefault;

  if (result === undefined && hasDefault) {
    return defaultValue;
  } else {
    return result;
  }
}
