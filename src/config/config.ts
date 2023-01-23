import convict from "convict";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "build", "development", "test"],
    default: "production",
    env: "NODE_ENV",
    arg: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "127.0.0.1",
      env: "DB_HOST",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "postgres",
      env: "DB_NAME",
    },
    user: {
      doc: "Database user",
      format: String,
      default: "postgres_user",
      env: "DB_USER",
    },
    port: {
      doc: "database port",
      format: "port",
      // note that this can be overriden depending on what environment you run on
      // please check out development.json and test.json and production.json
      default: 5432,
      env: "DB_PORT",
    },
    password: {
      doc: "database password",
      format: "*",
      default: "temporary",
      env: "DB_PASSWORD",
      sensitive: true,
    },
  },
});

const env = config.get("env");
try {
  config.loadFile(path.join(dirname, `${env}.json`));
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("Could not load env file", error);
}
config.validate({ allowed: "strict" });

export default {
  ...config.getProperties(),
};
