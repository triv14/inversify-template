import express from "express";
import container from "../inversify.config";
import Controller from "../controller/CustomersController";

const controller = container.resolve(Controller);

const customersRouter = express.Router();

customersRouter.get("/", controller.getAll);

export default customersRouter;
