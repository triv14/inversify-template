import { injectable } from "inversify";
import path from "path";
import { fileURLToPath } from "url";
import { Model } from "objection";
import { z } from "zod";
import BaseModel from "./BaseModel";
import schema from "../schema/customerSchema";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Note that as of TypeScript 4.9, classes can extend interfaces, but not types.
// This rule is okay to disable because all we're doing is making an interface from a type.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Customer extends z.infer<typeof schema> { }

@injectable()
class Customer extends BaseModel {
	constructor() {
		super(schema);
	}

	static get tableName() {
		return "customers";
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			Pet: {
				relation: Model.HasManyRelation,
				modelClass: path.join(dirname, "Pet"),
				join: {
					from: "customers.id",
					to: "pets.ownerId",
				},
			},

			Purchase: {
				relation: Model.HasManyRelation,
				modelClass: path.join(dirname, "Purchase"),
				join: {
					from: "customers.id",
					to: "purchases.customerId",
				},
			},
		};
	}
}

export default Customer;
