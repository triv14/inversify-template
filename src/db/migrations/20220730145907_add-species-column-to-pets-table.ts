import { Knex } from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.alterTable("pets", (table) => {
    table.string("species");
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.alterTable("pets", (table) => {
    table.dropColumn("species");
  });
};
