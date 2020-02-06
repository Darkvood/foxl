import { BaseProvider } from "./base-provider";
import { IStorageProvider, IState, StorageParams } from "../../../types/storage";
import { isObject } from "../../libs/utils";

export class WebProvider extends BaseProvider implements IStorageProvider {
  constructor(private params: StorageParams) {
    super();
  }

  init(): void {
    let seedRequired = true;
    const savedData = localStorage.getItem(this.params.path);

    if (savedData) {
      let state = JSON.parse(savedData);

      seedRequired = isObject(state);

      if (!seedRequired) {
        this.state = state;
      }
    }

    if (seedRequired) {
      this.state = this.params.seed as IState;
      this.save();
    }

    this.params.seed = null;
  }

  save(): void {
    if (this.params.save !== true) return;

    localStorage.setItem(this.params.path, JSON.stringify(this.state));
  }
}
