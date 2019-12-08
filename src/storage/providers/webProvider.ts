import { BaseProvider } from "./baseProvider";
import { IStorageProvider, IState } from "../../../types/storage";
import { isObject } from "../../libs/utils";

export class WebProvider extends BaseProvider implements IStorageProvider {
  constructor(private path: string, private seed: any) {
    super();
  }

  init(): void {
    let seedRequired = true;
    const savedData = localStorage.getItem(this.path);

    if (savedData) {
      let state = JSON.parse(savedData);

      seedRequired = isObject(state);

      if (!seedRequired) {
        this.state = state;
      }
    }

    if (seedRequired) {
      this.state = this.seed as IState;
      this.save();
    }

    this.seed = null;
  }

  save(): void {
    localStorage.setItem(this.path, JSON.stringify(this.state));
  }
}
