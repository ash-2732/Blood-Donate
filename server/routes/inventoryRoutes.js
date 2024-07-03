import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createInventoryController,
  getAllInventoryController,
} from "../controllers/inventoryController.js";

const inventoryRouter = express.Router();

//routes
inventoryRouter.post(
  "/create-inventory",
  authMiddleware,
  createInventoryController
);

//get all records
inventoryRouter.get(
  "/get-inventory",
  authMiddleware,
  getAllInventoryController
);

export default inventoryRouter;
