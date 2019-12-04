import { AppParams, FoxlDBCore } from "./core/core";

export class FoxlDB {
  $app: FoxlDBCore;

  constructor({ path, save = true, seed = {} }: AppParams) {
    if (!path && typeof path !== "string") {
      throw new Error(`[FoxlDB] The property "path" must be non-empty string`);
    }

    if (typeof save !== "boolean") {
      throw new Error(`[FoxlDB] The property "save" must be boolean`);
    }

    this.$app = new FoxlDBCore({ path, save, seed });
  }

  get<T>(key: string): T | undefined {
    return this.$app.$store.get(key);
  }
  set(key: string, value: any): boolean {
    return this.$app.$store.set(key, value);
  }
}
