import {
  FoxlClient as Client,
  FoxlServer as Server,
  FOXLDB_VERSION
} from "../../src";
import { FoxlClient } from "../../src/client";
import { FoxlServer } from "../../src/server";

describe(`The library is exported and have "verion" field`, () => {
  test("The library is exported", () => {
    expect(FOXLDB_VERSION).toBeTruthy();
  });
  test(`Client instanceof "FoxlClient"`, () => {
    const client = new Client();
    expect(client).toBeInstanceOf(FoxlClient);
  });
  test(`Server instanceof "FoxlServer"`, () => {
    const server = new Server();
    expect(server).toBeInstanceOf(FoxlServer);
  });
});
