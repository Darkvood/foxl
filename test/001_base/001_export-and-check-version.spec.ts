import { FOXLDB_VERSION } from "../../src";

describe(`The library is exported`, () => {
  test(`"FOXLDB_VERSION" is available`, () => {
    expect(FOXLDB_VERSION).toBeTruthy();
  });
});
