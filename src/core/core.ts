import { AppStorage, IStorage } from "../storage/appStorage";

export interface AppParams {
  path: string;
  save?: boolean;
  seed?: any;
}

export interface ParsedAppParams extends AppParams {
  save: boolean;
  seed: any;
}

export class FoxlDBCore {
  $store: IStorage;

  constructor(params: ParsedAppParams) {
    this.$store = new AppStorage(params);
  }
}
