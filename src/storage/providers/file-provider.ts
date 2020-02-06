import fse from "fs-extra";
import { BaseProvider } from "./base-provider";
import { IStorageProvider, StorageParams } from "../../../types/storage";

export class FileProvider extends BaseProvider implements IStorageProvider {
  private dataFile: string;
  private params: StorageParams;

  constructor(params: StorageParams) {
    super();

    this.params = { ...params };

    this.dataFile = this.params.path;
  }

  init(): void {
    const isReady = fse.pathExistsSync(this.dataFile);

    if (isReady) {
      this.resotreState();
    } else {
      this.seedStorage();
    }

    this.params.seed = null;
  }

  resotreState(): void {
    this.state = fse.readJsonSync(this.dataFile);
  }

  seedStorage(): void {
    fse.removeSync(this.dataFile);
    this.state = this.params.seed;

    this.save();
  }

  save(): void {
    if (this.params.save !== true) return;

    fse.outputJsonSync(this.dataFile, this.state);
  }
}
