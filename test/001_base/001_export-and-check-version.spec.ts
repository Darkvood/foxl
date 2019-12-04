import { FoxlServer as Server, FOXLDB_VERSION } from "../../src";
import { FoxlServer } from "../../src/app";

describe(`The library is exported`, () => {
  test(`"FOXLDB_VERSION" is available`, () => {
    expect(FOXLDB_VERSION).toBeTruthy();
  });
  test(`Exported server instance of "FoxlServer"`, () => {
    const server = new Server({ path: "./" });
    expect(server).toBeInstanceOf(FoxlServer);
  });
});
