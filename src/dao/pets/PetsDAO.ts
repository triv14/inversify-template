import { inject, injectable } from "inversify";
import {Model} from "objection";
import Pet from "../../model/Pet";
import DAO from "../base-classes/DAO";

@injectable()
class PetDAO extends DAO<Pet> {
  constructor(
    @inject("Pet")
    protected readonly _pet: typeof Model,
  ) {
    super(_pet);
  }

	async getSpeciesByCustomerId(customerId: string) {
		const result = await this.model.query().select("species").where({ customerId });
		return result as Pet[];
	}
}

export default PetDAO;
