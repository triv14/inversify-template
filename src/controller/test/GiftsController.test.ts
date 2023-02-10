import sinon, { SinonSpy, SinonStubbedInstance } from "sinon";
import { Request, Response } from "express";
import Controller from "../GiftsController";
import Service from "../../service/gifts/GiftsService";
import ApiError from "../../middleware/ApiError";

const sandbox = sinon.createSandbox();

describe("GiftsController", () => {
	let service: SinonStubbedInstance<Service>;
	let controller: Controller;

	let res: Partial<Response>;
	let req: Partial<Request>;
	let next: SinonSpy;

	beforeEach(() => {
		service = sandbox.createStubInstance(Service);
		service.findGiftByCustomerId = sandbox.stub();

		controller = new Controller(service);

		res = {
			status: sandbox.stub().returnsThis(),
			json: sandbox.stub().returnsThis(),
		};

		next = sandbox.spy();
	});

	afterEach(() => {
		sandbox.reset();
		sandbox.restore();
	});

	describe("# getGiftByCustomerId", () => {
		context("when there isn't an error", () => {
			it("calls service.findGiftByCustomerId()", async () => {
				// arrange
				// act
				req = {
					params: {
						customerId: '01',
					},
				};
				await controller.getGiftByCustomerId(req as Request, res as Response, next);
				// assert
				sandbox.assert.calledOnce(service.findGiftByCustomerId);
			});
		});

		context("when there is an error", () => {
			it("calls next with ApiError.internal", async () => {
				// arrange
				service.getAll.rejects(new Error("error"));
				// act
				await controller.getGiftByCustomerId(req as Request, res as Response, next);
				// assert
				sandbox.assert.calledOnce(next);
				sandbox.assert.calledWith(next, sandbox.match.instanceOf(ApiError));
			});
		});
	});
});