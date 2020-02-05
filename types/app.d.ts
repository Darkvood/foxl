export interface AppParams {
  path: string;
  save?: boolean;
  seed?: any;
}

export interface ParsedAppParams extends Required<AppParams> {}
