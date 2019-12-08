import fse from "fs-extra";
import { resolve } from "path";
import { PATH_TO_DB } from "./constants";

// Test settings
export function initTest() {
  beforeEach(() => {
    return clearTemp();
  });
  afterAll(() => {
    return clearTemp();
  });
}

// clear test temp dir
function clearTemp() {
  return fse.remove(resolve(__dirname, PATH_TO_DB));
}
