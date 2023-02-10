import { injectable } from "inversify";
import path from "path";
import { fileURLToPath } from "url";
import { Model } from "objection";
import { z } from "zod";
import BaseModel from "./BaseModel";
import schema from "../schema/petSchema";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Note that as of TypeScript 4.9, classes can extend interfaces, but not types.
// This rule is okay to disable because all we're doing is making an interface from a type.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Pet extends z.infer<typeof schema> { }

@injectable()
class Pet extends BaseModel {
	constructor(id: string, name: string, ownerId: string, species: string) {
		super(schema);
		this.id = id;
		this.name = name;
		this.ownerId = ownerId;
		this.species = species;
	}

	static get tableName() {
		return "pets";
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			Owner: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(dirname, "Customer"),
				join: {
					from: "pets.ownerId",
					to: "customers.id",
				},
			},
		};
	}
}

export default Pet;
