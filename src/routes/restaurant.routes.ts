import express from "express";
import { requiresUser, validateRequest } from "../middleware";
const router = express.Router();
import {
  getRestaurantsHandlerMobile,
  updateRestaurantHandler,
} from "../controllers/restaurant.controller";

import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
} from "../schema/category.schema";

// create a category
// router.post("/", [requiresUser, validateRequest(createCategorySchema)], createCategoryHandler);

// get all categories (, requiresUser)
// router.get("/", requiresUser, getCategoriesHandler);

// get all restaurants mobile
router.get("/mobile", requiresUser, getRestaurantsHandlerMobile);

// update restaurant
router.put("/:resId", requiresUser, updateRestaurantHandler);

// get a category
// router.get("/:categoryId", [requiresUser, validateRequest(getCategorySchema)], getCategoryHandler);

// update a category
// router.put(
//   "/:categoryId",
//   [requiresUser, validateRequest(updateCategorySchema)],
//   updateCategoryHandler
// );

// delete a category
// router.delete(
//   "/:categoryId",
//   [requiresUser, validateRequest(deleteCategorySchema)],
//   deleteCategoryHandler
// );

export default router;
