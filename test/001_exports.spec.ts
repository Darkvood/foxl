import { createStorage } from "../src/file";
import { INSTANCE_API, PATH_TO_DB } from "./common/constants";
import { initTest } from "./common/service";

describe(`The library is exported`, () => {
  initTest();

  it("should have all instance methods", () => {
    const db = createStorage({ path: PATH_TO_DB });

    for (let prop in INSTANCE_API) {
      // @ts-ignore
      expect(typeof db[prop]).toBe(INSTANCE_API[prop]);
    }
  });
});
