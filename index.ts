import SetupExpress from "./src/SetupExpress";
import config from "./src/config/config";

const express = new SetupExpress();
const server = express.run(config.port);

export {};
