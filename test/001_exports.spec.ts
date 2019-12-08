import { createStorage } from "../src/index";
import { INSTANCE_API, PATH_TO_DB } from "./common/constants";
import { initTest } from "./common/service";

initTest();

describe(`The library is exported`, () => {
  it("should have all instance methods", () => {
    const db = createStorage({ path: PATH_TO_DB });

    for (let prop in INSTANCE_API) {
      // @ts-ignore
      expect(typeof db[prop]).toBe(INSTANCE_API[prop]);
    }
  });
});
