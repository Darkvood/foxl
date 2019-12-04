import { AppParams, FoxlDBCore } from "./core/core";

export class FoxlDB {
  $app: FoxlDBCore;

  constructor({ path, autoSave = true, seed = {} }: AppParams) {
    if (!path && typeof path !== "string") {
      throw new Error(`[FoxlDB] The property "path" must be non-empty string`);
    }

    if (typeof autoSave !== "boolean") {
      throw new Error(`[FoxlDB] The property "autoSave" must be boolean`);
    }

    this.$app = new FoxlDBCore({ path, autoSave, seed });
  }

  async get<T>(key: string): Promise<T | undefined> {
    return await this.$app.$store.get(key);
  }
  async set(key: string, value: any): Promise<boolean> {
    return await this.$app.$store.set(key, value);
  }
}
