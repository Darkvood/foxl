interface AppParams {
  path: string;
  save?: boolean;
  seed?: any;
}

interface ParsedAppParams extends AppParams {
  save: boolean;
  seed: any;
}
