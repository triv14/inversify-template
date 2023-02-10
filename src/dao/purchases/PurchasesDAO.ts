// we should not need to import "reflect-metadata" here, 
// but there is a bug which requires it.
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Model } from "objection";
import Purchase from "../../model/Purchase";
import DAO from "../base-classes/DAO";

@injectable()
class PurchasesDAO extends DAO<Purchase> {
	constructor(
		@inject("Purchase")
		protected readonly _purchases: typeof Model,
	) {
		super(_purchases);
	}

	async getPurchasesByCustomerId(customerId: string) {
		const result = await this.model.query().where({ customerId });
		return result as Purchase[];
	}
}

export default PurchasesDAO;