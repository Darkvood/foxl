import pkg from "../package.json";

export { FoxlClient, IFoxlClient } from "./client";
export { FoxlServer, IFoxlServer } from "./server";

export const FOXLDB_VERSION: string = pkg.version;
