import fse from "fs-extra";
import { IStorageProvider, IState } from "./appStorage";

export class FileProvider implements IStorageProvider {
  private dataFile: string;
  private state: IState = {};

  constructor(private path: string, private seed: any) {
    this.dataFile = `${this.path}/foxldb.json`;
  }

  init() {
    const isReady = fse.pathExistsSync(this.dataFile);

    if (isReady) {
      this.state = fse.readJsonSync(this.dataFile);
    } else {
      fse.removeSync(this.dataFile);
      fse.outputJsonSync(this.dataFile, this.seed);

      this.state = this.seed as IState;
    }

    this.seed = null;
  }

  get<T>(key: string): T | undefined {
    return this.state[key];
  }

  set(key: string, value: any): boolean {
    if (this.state[key]) {
      this.state[key] = value;
      return true;
    }
    return false;
  }
}
