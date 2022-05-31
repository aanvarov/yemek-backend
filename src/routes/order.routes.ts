import express from "express";
import { requiresUser, validateRequest } from "../middleware";
const router = express.Router();
import {
  createOrderHandler,
  updateOrderHandler,
  getOrdersHandler,
  getOrderHandler,
  deleteOrderHandler,
} from "../controllers/order.controller";

import {
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
  getOrderSchema,
} from "../schema/order.schema";

// create a order
router.post(
  "/",
  [requiresUser, validateRequest(createOrderSchema)],
  createOrderHandler
);

// get all order (, requiresUser)
router.get("/", requiresUser, getOrdersHandler);

// get a order
router.get(
  "/:orderId",
  [requiresUser, validateRequest(getOrderSchema)],
  getOrderHandler
);

// update a order
router.put(
  "/:orderId",
  [requiresUser, validateRequest(updateOrderSchema)],
  updateOrderHandler
);

// delete a order
router.delete(
  "/:orderId",
  [requiresUser, validateRequest(deleteOrderSchema)],
  deleteOrderHandler
);

export default router;
