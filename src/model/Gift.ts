import { injectable } from "inversify";
import path from "path";
import { fileURLToPath } from "url";
import { Model } from "objection";
import { z } from "zod";
import BaseModel from "./BaseModel";
import schema from "../schema/giftSchema";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Note that as of TypeScript 4.9, classes can extend interfaces, but not types.
// This rule is okay to disable because all we're doing is making an interface from a type.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Gift extends z.infer<typeof schema> { }

@injectable()
class Gift extends BaseModel {
	constructor(customerId: string, description: string) {
		super(schema);
		this.customerId = customerId;
		this.description = description;
	}

	// Table name is the only required property.
	static get tableName() {
		return "gifts";
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			Customer: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(dirname, "Customer"),
				join: {
					from: "gifts.customerId",
					to: "customers.id",
				},
			},
		};
	}
}

export default Gift;
