import { FileStorage } from "./fileStorage";
import { parseQuery } from "./parser";

export interface IServerParams {
  mode?: "local";
  path: string;
}

export class ServerCore {
  $fs: FileStorage;

  constructor(params: IServerParams) {
    this.$fs = new FileStorage(params.path);
  }

  async query<T>(query: string): Promise<T> {
    const parsed = parseQuery(query);

    return (parsed as any) as T;
  }
}
