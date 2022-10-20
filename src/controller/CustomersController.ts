import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import Service from "../service/customers/CustomersService";
import ApiError from "../middleware/ApiError";

@injectable()
class CustomersController {
  constructor(private readonly _service: Service) {
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.getAll();
      return res.status(200).json(result);
    } catch (e: unknown) {
      let message;
      let stack;

      if (e instanceof Error) {
        message = e.message;
        stack = e.stack;
      } else {
        message = JSON.stringify(e);
        stack = "CustomersController.getAll()";
      }

      next(ApiError.internal(message));
    }
  }
}

export default CustomersController;
