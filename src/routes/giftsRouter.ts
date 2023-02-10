import express, { RequestHandler } from "express";
import container from "../inversify.config";
import Controller from "../controller/GiftsController";


const controller = container.resolve(Controller);

const giftsRouter = express.Router();

giftsRouter.get("/api/customers/:customerId/gifts​", controller.getGiftByCustomerId as RequestHandler);

export default giftsRouter;
