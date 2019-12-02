import { ServerCore, IServerParams } from "./core/core";

export interface IFoxlServer {
  query<T>(query: string): Promise<T>;
}

export class FoxlServer implements IFoxlServer {
  private app: ServerCore;

  constructor(params: IServerParams) {
    if (params.mode !== "local") {
      throw new Error(`[FoxlServer] Unknown connection type. Сheck "mode" params`);
    }

    if (!params.path && typeof params.path !== "string") {
      throw new Error(`[FoxlServer] The param "path" must be non-empty string`);
    }

    this.app = new ServerCore(params);
  }

  async query<T>(query: string): Promise<T> {
    return await this.app.query(query);
  }
}
