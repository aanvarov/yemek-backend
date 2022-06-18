import express from "express";
const router = express.Router();
import { requiresUser, validateRequest } from "../middleware";
import {
  createFoodHandler,
  getFoodsHandler,
  getFoodsHandlerMobile,
  getFoodHandler,
  updateFoodHandler,
  deleteFoodHandler,
  getFoodsHandlerMobileAll,
} from "../controllers/food.controller";
import {
  createFoodSchema,
  getFoodSchema,
  updateFoodSchema,
  deleteFoodSchema,
} from "../schema/food.schema";

// create a food
router.post("/", [requiresUser, validateRequest(createFoodSchema)], createFoodHandler);

// get all foods
router.get("/", requiresUser, getFoodsHandler);

// get all foods mobile
router.get("/mobile/:resId", requiresUser, getFoodsHandlerMobile);

// get all foods mobile
router.get("/mobile", requiresUser, getFoodsHandlerMobileAll);
// get a food
router.get("/:foodId", [requiresUser, validateRequest(getFoodSchema)], getFoodHandler);

// update a food
router.put("/:foodId", requiresUser, updateFoodHandler);

// delete a food
router.delete("/:foodId", [requiresUser, validateRequest(deleteFoodSchema)], deleteFoodHandler);

export default router;
