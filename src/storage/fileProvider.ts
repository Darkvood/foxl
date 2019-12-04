import fse from "fs-extra";
import { IStorageProvider, IState } from "./appStorage";
import { safeGet, parentIsMutable, commitChanges } from "../core/utils";

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

  get<T>(path: string): T | undefined {
    return safeGet(this.state, path);
  }

  set(path: string, value: any): boolean {
    if (parentIsMutable(this.state, path)) {
      return commitChanges(this.state, path, value);
    }
    return false;
  }
}
