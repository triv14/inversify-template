import { injectable } from "inversify";
import path from "path";
import { fileURLToPath } from "url";
import { Model } from "objection";
import { z } from "zod";
import BaseModel from "./BaseModel";
import schema from "../schema/purchaseSchema";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Note that as of TypeScript 4.9, classes can extend interfaces, but not types.
// This rule is okay to disable because all we're doing is making an interface from a type.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Purchase extends z.infer<typeof schema> {

}
@injectable()
class Purchase extends BaseModel {
	constructor(date: Date, customerId: string, id: string, total: number) {
		super(schema);
		this.date = date;
		this.customerId = customerId;
		this.id = id;
		this.total = total;
	}

	static get tableName() {
		return "purchases";
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			Customer: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(dirname, "Customer"),
				join: {
					from: "purchases.customerId",
					to: "customers.id",
				},
			},
		};
	}
}

export default Purchase;
