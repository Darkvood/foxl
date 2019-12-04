import { AppParams, FoxlDBCore } from "./core/core";
import { isObject } from "./core/utils";

export class FoxlDB {
  private $app: FoxlDBCore;

  constructor({ path, save = true, seed = {} }: AppParams) {
    if (!path && typeof path !== "string") {
      throw new Error(`[FoxlDB] The params "path" must be non-empty string`);
    }

    if (typeof save !== "boolean") {
      throw new Error(`[FoxlDB] The params "save" must be boolean`);
    }

    if (!isObject(seed)) {
      throw new Error(`[FoxlDB] The params "seed" must be plain object`);
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
