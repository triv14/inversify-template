import { Model } from "objection";
import knex from "knex";
import knexFile from "./knexFile";

const setupDb = () => {
  const db = knex(knexFile);

  // plug db config into objection
  Model.knex(db);
};

export default setupDb;
