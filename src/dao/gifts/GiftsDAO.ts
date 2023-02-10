import { inject, injectable } from "inversify";
import { Model } from "objection";
import DAO from "../base-classes/DAO";
import Gift from "../../model/Gift";


@injectable()
class GiftsDAO extends DAO<Gift> {
	constructor(
		@inject("Gift")
		protected readonly _gift: typeof Model,
	) {
		super(_gift);
	}

	async checkIfCustomersHasReceivedPromotion(customerId: string, promotionStartDate: Date) {
		const result = await this.model.query().where({ customerId }).andWhere("collected_at", ">=", promotionStartDate);
		return result as Gift[];
	}

	async addNewGiftEntryToGiftTable(gift: Gift) {
		const result = await this.model.query().insert(gift);
		return result instanceof Model;
	}
}

export default GiftsDAO;
