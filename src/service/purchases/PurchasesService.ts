import { injectable } from "inversify";
import Service from "../base-classes/Service";
import PurchasesDAO from "../../dao/purchases/PurchasesDAO";
import Purchase from "../../model/Purchase";


@injectable()
class PurchasesService extends Service<Purchase> {
	constructor(protected readonly _purchasesDAO: PurchasesDAO) {
		super(_purchasesDAO);
	}

	async getByCustomerIdBeforeDate(customerId: string, date: Date): Promise<Purchase[]> {
		const purchasesByCustomer = await this._purchasesDAO.getPurchasesByCustomerId(customerId);
		return purchasesByCustomer.filter((purchase) => (purchase.date < date));
	}
}

export default PurchasesService;
