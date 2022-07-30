import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

export const seed = async (knex: Knex) => {
  // customers
  const customers = [];

  for (let i = 0; i < 10; i++) {
    customers.push({
      id: uuidv4(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });
  }
  
  await knex("customers").insert(customers);
};
