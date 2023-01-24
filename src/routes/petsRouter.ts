import express from "express";
import container from "../inversify.config";
import Controller from "../controller/PetsController";

const controller = container.resolve(Controller);

const petsRouter = express.Router();

petsRouter.get("/", controller.getAll);

export default petsRouter;
