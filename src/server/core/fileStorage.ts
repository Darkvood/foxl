import fse from "fs-extra";

export interface FoxlJSON {
  version: string;
}

export class FileStorage {
  configFile: string;
  dataDir: string;

  constructor(private path: string) {
    this.configFile = `${this.path}/foxldb.json`;
    this.dataDir = `${this.path}/data`;
  }

  async init() {
    try {
      const hasConfigFile = await fse.pathExists(this.configFile);
      const hasDataDir = await fse.pathExists(this.dataDir);

      const isReady = hasConfigFile && hasDataDir;

      if (!isReady) {
        await fse.remove(this.path);

        const config: FoxlJSON = { version: `${Math.random()}` };

        await fse.outputJSON(this.configFile, config);
        await fse.ensureDir(this.dataDir);
      }
    } catch (e) {
      console.error("[FoxlFileStorage] Can't init file storage");
      console.error(e);
    }
  }
}
