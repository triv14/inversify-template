import { injectable } from "inversify";
import Service from "../base-classes/Service";
import PetsDAO from "../../dao/pets/PetsDAO";
import Pet from "../../model/Pet";

@injectable()
class PetsService extends Service<Pet> {
	constructor(protected readonly _petsDAO: PetsDAO) {
		super(_petsDAO);
	}

	async getSpeciesByCustomerId(customerId: string): Promise<Pet[]> {
		const result = await this._petsDAO.getSpeciesByCustomerId(customerId);
		return result;
	}
}

export default PetsService;
