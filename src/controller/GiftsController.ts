import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import Service from "../service/gifts/GiftsService";
import ApiError from "../middleware/ApiError";

@injectable()
class GiftsController {
	constructor(private readonly _service: Service) {
		this.getGiftByCustomerId = this.getGiftByCustomerId.bind(this);
	}

	public getGiftByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { customerId } = req.params;
			const result = await this._service.findGiftByCustomerId(customerId);
			if (!result) {
				next(ApiError.notFound(`Customer with id ${customerId} not found`));
				return;
			}
			res.status(200).json(result);
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : JSON.stringify(e);
			next(ApiError.internal(message));
		}
	}
}

export default GiftsController;