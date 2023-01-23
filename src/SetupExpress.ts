import express, { Express } from "express";
import { Server as HttpServer } from "http";
import router from "./routes/router";

class ExpressSetup {
  app: Express;

  server?: HttpServer;

  constructor() {
    this.app = express();
    this.setup();
  }

  setup() {
    // parsers
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // Routes
    this.app.use("/api", router);
  }

  // server
  run(port: string | number) {
    this.server = this.app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`server running on port ${port}`);
    });
    return this.server;
  }

  stop(done?: (err?: Error) => void) {
    this.server?.close(done);
  }
}

export default ExpressSetup;
