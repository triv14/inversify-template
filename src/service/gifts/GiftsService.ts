import { injectable } from "inversify";
import Service from "../base-classes/Service";
import GiftsDAO from "../../dao/gifts/GiftsDAO";
import Gift from "../../model/Gift";
import PetsService from "../pets/PetsService";
import PurchasesService from "../purchases/PurchasesService";
import CustomersService from "../customers/CustomersService";


@injectable()
class GiftsService extends Service<Gift> {
	private previousPurchaseWithinNumMonths = 6; // number of months before promotion start date a customer needs to made purchases before to eligibel for promotion

	private promotionStartDate = new Date(); // Current implementation assume promotion is only run in 1 day.

	constructor(protected readonly _giftsDAO: GiftsDAO, private readonly _petsService: PetsService,
		private readonly _purchasesService: PurchasesService, private readonly _customersService: CustomersService) {
		super(_giftsDAO);
	}

	async checkIfCustomersHasReceivedPromotion(customerId: string, promotionStartDate: Date) {
		const result = await this._giftsDAO.checkIfCustomersHasReceivedPromotion(customerId, promotionStartDate);
		return (result.length !== 0);
	}

	async addNewGiftEntryToGiftTable(gift: Gift) {
		const result = await this._giftsDAO.addNewGiftEntryToGiftTable(gift);
		return result;
	}

	async findGiftByCustomerId(customerId: string): Promise<Gift | null> {
		const date = new Date();
		date.setMonth(date.getMonth() - this.previousPurchaseWithinNumMonths);

		const purchasesResult = await this._purchasesService.getByCustomerIdBeforeDate(customerId, date);

		// Case when customer has no purchases within the date range
		if (purchasesResult.length === 0) {
			return null;
		}

		// Check if customer has already gotten the promotion 
		const receivedGift = await this.checkIfCustomersHasReceivedPromotion(customerId, this.promotionStartDate);
		if (receivedGift) {
			return null;
		}

		const petsResult = await this._petsService.getSpeciesByCustomerId(customerId);

		// Get a random from pet species
		const random = Math.floor(Math.random() * (petsResult.length));
		const pet = petsResult[random];

		const gift = new Gift(customerId, `${pet.species} gift`);

		// add the new gift entry to the Gift table
		const insertResult = await this.addNewGiftEntryToGiftTable(gift);
		if (insertResult === false) {
			return null;
		}
		return gift;
	}
}

export default GiftsService;
