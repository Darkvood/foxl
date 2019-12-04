import fse from "fs-extra";
import { IStorageProvider, IState } from "./appStorage";

export class FileProvider implements IStorageProvider {
  private dataFile: string;
  private state: IState = {};

  constructor(private path: string, private seed: any) {
    this.dataFile = `${this.path}/foxldb.json`;
  }

  async init() {
    const isReady = await fse.pathExists(this.dataFile);

    if (isReady) {
      this.state = await fse.readJson(this.dataFile);
    } else {
      await fse.remove(this.dataFile);
      await fse.outputJSON(this.dataFile, this.seed);

      this.state = this.seed as IState;
    }

    this.seed = null;
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.state[key];
  }

  async set(key: string, value: any): Promise<boolean> {
    if (this.state[key]) {
      this.state[key] = value;
      return true;
    }
    return false;
  }
}
