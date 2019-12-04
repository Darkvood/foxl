import fse from "fs-extra";

export class FileStorage {
  dataFile: string;

  constructor(private path: string) {
    this.dataFile = `${this.path}/foxldb.json`;
  }

  async init() {
    try {
      const isReady = await fse.pathExists(this.dataFile);

      if (!isReady) {
        await fse.remove(this.path);

        const data = {};

        await fse.outputJSON(this.dataFile, data);
      }
    } catch (e) {
      console.error("[FoxlFileStorage] Can't init file storage");
      console.error(e);
    }
  }
}
