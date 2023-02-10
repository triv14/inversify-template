import { Knex } from "knex";


export const up = async (knex: Knex) => {
  await knex.schema.createTable("gifts", (table) => {
		table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
    table.timestamps(true, true);
    table.string("customer_id").references("id").inTable("customers");
    table.string("description");
    table.timestamp("collected_at").defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable("gifts");
};

