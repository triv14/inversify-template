import chai from "chai";
import sinon, { SinonStubbedInstance } from "sinon";
import Pet from "../../../model/Pet";
import Gift from "../../../model/Gift";
import Purchase from "../../../model/Purchase";

// file under test
import PurchasesDAO from "../../../dao/purchases/PurchasesDAO";
import CustomersDAO from "../../../dao/customers/CustomersDAO";
import GiftsDAO from "../../../dao/gifts/GiftsDAO";
import PetsDAO from "../../../dao/pets/PetsDAO";
import GiftsService from "../../gifts/GiftsService";
import PetsService from "../../pets/PetsService";
import PurchasesService from "../../purchases/PurchasesService";
import CustomersService from "../../customers/CustomersService";

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("src :: service :: base-classes :: Service", () => {
	// test double variables (stubs))
	let giftsDAO: SinonStubbedInstance<GiftsDAO>;
	let petsDAO: SinonStubbedInstance<PetsDAO>;
	let purchasesDAO: SinonStubbedInstance<PurchasesDAO>;
	let customersDAO: SinonStubbedInstance<CustomersDAO>;
	let petsService: PetsService;
	let purchasesService: PurchasesService;
	let giftsService: GiftsService;
	let customersService: CustomersService;
	let previousPurchaseWithinNumMonths: number;
	let date: Date;
	const customerId = "14";
	const itemId = "01";

	beforeEach(() => {
		giftsDAO = sandbox.createStubInstance(GiftsDAO);
		purchasesDAO = sandbox.createStubInstance(PurchasesDAO);
		petsDAO = sandbox.createStubInstance(PetsDAO);
		customersDAO = sandbox.createStubInstance(CustomersDAO);
		giftsDAO.checkIfCustomersHasReceivedPromotion = sandbox.stub();

		purchasesService = new PurchasesService(purchasesDAO);
		customersService = new CustomersService(customersDAO)
		petsService = new PetsService(petsDAO);
		giftsService = new GiftsService(giftsDAO, petsService, purchasesService, customersService);

		previousPurchaseWithinNumMonths = 6;
		date = new Date();
		date.setMonth(date.getMonth() - previousPurchaseWithinNumMonths);
		date.setDate(date.getDate() + 1);
	});

	afterEach(() => {
		sandbox.restore();
		sandbox.reset();
	});

	describe("# findGiftByUserId", () => {
		it("Customer has no purchases over 6 months => should return a null object", async () => {
			const purchase = new Purchase(date, customerId, itemId, 14);
			const purchasesArr = [purchase];

			purchasesDAO.getPurchasesByCustomerId.resolves(purchasesArr);
			const result = await giftsService.findGiftByCustomerId(customerId);
			expect(result).to.deep.equal(null);
		});

		it("Customer has purchases over 6 months and have received promotion => should return a null object", async () => {
			const purchase = new Purchase(date, customerId, itemId, 14);
			const purchasesArr = [purchase];
			purchasesDAO.getPurchasesByCustomerId.resolves(purchasesArr);

			const gift = new Gift(customerId, "dog gift");
			const gifts = [gift];
			giftsDAO.checkIfCustomersHasReceivedPromotion.resolves(gifts);

			const result = await giftsService.findGiftByCustomerId(customerId);
			expect(result).to.deep.equal(null);
		});

		it("Customer has purchases over 6 months and have not received promotion => should return a gift object", async () => {
			date.setDate(date.getDate() - 2);
			const purchaseDate1 = date;
			date.setDate(date.getDate() - 3);
			const purchaseDate2 = date;

			const purchase1 = new Purchase(purchaseDate1, customerId, "01", 14);
			const purchase2 = new Purchase(purchaseDate2, customerId, "02", 14);
			const purchasesArr = [purchase1, purchase2];
			const purchasesResult = purchasesDAO.getPurchasesByCustomerId.withArgs(customerId).resolves(purchasesArr);
			expect(purchasesResult).to.not.equal(null);

			const gifts: Gift[] = [];
			giftsDAO.checkIfCustomersHasReceivedPromotion.resolves(gifts);

			const pet1 = new Pet("01", "Tank", customerId, "dog");
			const pet2 = new Pet("02", "Blu", customerId, "cat");

			const pets = [pet1, pet2];
			petsDAO.getSpeciesByCustomerId.resolves(pets);

			const result = await giftsService.findGiftByCustomerId(customerId);

			expect(result).to.not.equal(null);
			expect(result?.customerId).to.deep.equal(customerId);
			expect(result?.description).to.be.oneOf(['cat gift', 'dog gift']);
		});
	});

});