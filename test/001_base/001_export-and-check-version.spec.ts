import {
  FoxlClient as Client,
  FoxlServer as Server,
  FOXLDB_VERSION
} from "../../src";
import { FoxlClient } from "../../src/client";
import { FoxlServer } from "../../src/server";

describe(`The library is exported`, () => {
  test(`"FOXLDB_VERSION" is available`, () => {
    expect(FOXLDB_VERSION).toBeTruthy();
  });
  test(`Exported client instance of "FoxlClient"`, () => {
    const client = new Client();
    expect(client).toBeInstanceOf(FoxlClient);
  });
  test(`Exported server instance of "FoxlServer"`, () => {
    const server = new Server();
    expect(server).toBeInstanceOf(FoxlServer);
  });
});
